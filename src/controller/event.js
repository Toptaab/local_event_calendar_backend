const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const fs = require("fs")
const { FACILITY_LIST } = require("../constant")
const { ROLE } = require("../constant/enum")

exports.getAll = utils.catchError(async (req, res, next) => {
    const allEvent = await repo.event.getAll()
    res.status(200).json(allEvent)
})

exports.getAllUpcomimng = utils.catchError(async (req, res, next) => {
    const today = new Date()
    const targetDate = new Date(today)
    targetDate.setDate(today.getDate() + 30)

    const AllUpcomimng = await repo.event.getAllUpcomimng(targetDate)
    res.status(200).json(AllUpcomimng)
})

exports.getEvent = utils.catchError(async (req, res, next) => {
    const { eventId } = req.params

    const event = await repo.event.get({ id: +eventId })
    res.status(200).json(event)
})

exports.getinRange = utils.catchError(async (req, res, next) => {
    const { firstDay, lastDay } = req.body
    const a = req.body

    const events = await repo.event.getRangeEvent(firstDay, lastDay)
    res.status(200).json(events)
})

exports.createEvent = utils.catchError(async (req, res, next) => {
    const {
        food,
        medicalService,
        petFriendly,
        wifi,
        entranceFee,
        prayerRoom,
        toilet,
        parking,
        provinceId,
        districtId,
        subDistrictId,
        address,
        address2,
        lat,
        long,
        ...eventData
    } = req.body
    const { coverImage, image } = req.files
    eventData.organizerInformationId = req.user.id
    eventData.categoryId = +eventData.categoryId

    // Guard boolean and string
    if (eventData.isYearly === "true") {
        eventData.isYearly = true
    } else {
        eventData.isYearly = false
    }

    // UPLOAD coverImage to Cloudinary
    const coverImageUrl = await utils.cloudinary.uploadImage(coverImage[0].path)
    eventData.coverImage = coverImageUrl.secure_url

    // CREATE event
    const event = await repo.event.createEvent(eventData)

    // Delete image in public folder
    fs.unlink(coverImage[0].path, () => {})

    // CREATE Facility
    const facilityData = { petFriendly, wifi, entranceFee, prayerRoom, toilet, parking, medicalService, food }
    for (key in facilityData) {
        if (facilityData[key] === "true") {
            facilityData[key] = true
        } else {
            facilityData[key] = false
        }
    }
    facilityData.eventId = event.id
    await repo.event.createFacility(facilityData)

    // CREATE event address
    const eventAdressData = { provinceId, districtId, address2, subDistrictId, address, lat, long, eventId: event.id }
    for (const key in eventAdressData) {
        if (key !== "address" && key !== "address2") {
            eventAdressData[key] = +eventAdressData[key]
        }
    }
    await repo.event.createEventAddess(eventAdressData)

    // UPLOAD eventImage to Cloudinary
    if (image) {
        const eventImageData = []
        for (file of image) {
            const { path } = file
            const eventImageUrl = await utils.cloudinary.uploadImage(path)
            eventImageData.push({ eventId: event.id, image: eventImageUrl.secure_url })
        }
        // CREATE eventImage
        await repo.eventImage.createEventImages(eventImageData)
        for (file of image) {
            const { path } = file
            fs.unlink(path, () => {})
        }
    }

    res.status(200).json(event.id)
})

module.exports.getAllInScope = utils.catchError(async (req, res, next) => {
    const { _southWest, _northEast } = req.body
    const { lat: minLat, lng: minLon } = _southWest
    const { lat: maxLat, lng: maxLon } = _northEast
    const allEvent = await repo.event.getAllInScope({ minLat, minLon, maxLat, maxLon })
    res.status(200).json(allEvent)
})

module.exports.getFilteredEvent = utils.catchError(async (req, res, next) => {
    const today = new Date()
    const data = req.body

    const where = {}

    // check where condition
    if (data?.title) {
        where.title = {}
        where.title.contains = data.title
    }
    if (data?.categoryId) {
        where.categoryId = data.categoryId
    }
    if (data?.provinceId) {
        where.EventAddress = {}
        where.EventAddress.provinceId = data.provinceId
    }

    //check event facility
    const facilityArray = Object.keys(FACILITY_LIST)
    for (value of facilityArray) {
        if (data[value]) {
            if (!where?.EventFacility) {
                where.EventFacility = {}
            }
            where.EventFacility[value] = true
        }
    }

    const events = await repo.event.getFilteredEvent(where)

    res.status(200).json(events)
})

module.exports.updateEvent = utils.catchError(async (req, res, next) => {
    const {
        food,
        medicalService,
        petFriendly,
        wifi,
        entranceFee,
        prayerRoom,
        toilet,
        parking,
        provinceId,
        districtId,
        subDistrictId,
        address,
        address2,
        lat,
        long,
        ...eventData
    } = req.body
    const { eventId } = req.params
    const coverImage = req.file

    //Authorization Guard
    const userId = req.user.id
    const { OrganizerInformation } = await repo.user.getUser({ id: +userId })
    const eventOwner = await repo.event.get({ id: +eventId })
    if (eventOwner.organizerInformationId !== OrganizerInformation.id) {
        throw new CustomError("this is not your event", "Athorization", 400)
    }

    // Guard boolean and string
    if (eventData.isYearly === "true") {
        eventData.isYearly = true
    } else if (eventData.isYearly === "false") {
        eventData.isYearly = false
    }

    // Delete oldimage
    const oldEvent = await repo.event.get({ id: +eventId })
    if (oldEvent.coverImage.includes("local_event_path")) {
        const publicId = utils.getPubblicId(oldEvent.coverImage)
        await utils.cloudinary.deleteImage(publicId)
    }

    // UPLOAD coverImage to Cloudinary
    if (coverImage) {
        const coverImageUrl = await utils.cloudinary.uploadImage(coverImage.path)
        eventData.coverImage = coverImageUrl.secure_url
        fs.unlink(coverImage.path, () => {})
    }

    // UPDATE event
    if (eventData.categoryId) {
        eventData.categoryId = +eventData.categoryId
    }
    const event = await repo.event.updateEvent({ id: +eventId }, eventData)

    // UPDATE facility
    const facilityData = { parking, toilet, prayerRoom, food, entranceFee, wifi, medicalService, petFriendly }
    for (key in facilityData) {
        if (facilityData[key] === "true") {
            facilityData[key] = true
        } else if (facilityData[key] === "false") {
            facilityData[key] = false
        }
    }
    await repo.event.updateFacility({ eventId: +eventId }, facilityData)

    // UPDATE Event address
    const eventAdressData = { provinceId, districtId, subDistrictId, address2, address, lat, long, eventId: event.id }
    for (const key in eventAdressData) {
        if (key !== "address" && key !== "address2" && eventAdressData[key]) {
            eventAdressData[key] = +eventAdressData[key]
        }
    }

    await repo.event.updateEventAddess({ eventId: +eventId }, eventAdressData)

    res.status(200).json({ message: "Update success" })
})

module.exports.deleteEvent = utils.catchError(async (req, res, next) => {
    const { eventId } = req.params

    //Authorization Guard
    const userId = req.user.id
    const { OrganizerInformation } = await repo.user.getUser({ id: +userId })
    const eventOwner = await repo.event.get({ id: +eventId })
    if (eventOwner.organizerInformationId !== OrganizerInformation.id) {
        throw new CustomError("this is not your event", "Athorization", 400)
    }

    // Delete oldimage
    const oldEvent = await repo.event.get({ id: +eventId })
    const publicId = utils.getPubblicId(oldEvent.coverImage)
    await utils.cloudinary.deleteImage(publicId)

    await repo.eventImage.deleteEventImages({ eventId: +eventId })
    await repo.event.deleteEventAddess({ eventId: +eventId })
    await repo.event.deleteHighlightEvent({ eventId: +eventId })
    await repo.reminder.deleteReminderByEventId({ eventId: +eventId })
    await repo.event.deleteEventFeedback({ eventId: +eventId })
    await repo.event.deleteFacility({ eventId: +eventId })
    await repo.event.deleteEvent({ id: +eventId })

    res.status(200).json({ message: "Delete success" })
})

// =========================================== HighLight ====================================== //
exports.getHighlight = utils.catchError(async (req, res, next) => {

    const highlightEvents = await repo.event.getHighlight()
    res.status(200).json(highlightEvents)
})

module.exports.createHighlight = utils.catchError(async (req, res, next) => {
    const { id } = req.user
    const { eventId } = req.body

    const admin = await repo.user.getUser({ id })
    if (admin.role !== ROLE.ADMIN) {
        throw new CustomError("No authorize to do it", "Invalid Authorization", 401)
    }

    await repo.event.createHighlight({ eventId })

    res.status(200).json({ message: "add Success" })
})
 
module.exports.deleteHighlight = utils.catchError(async (req, res, next) => {
    const { id } = req.user
    const { eventId } = req.params

    const admin = await repo.user.getUser({ id })
    if (admin.role !== ROLE.ADMIN) {
        throw new CustomError("No authorize to do it", "Invalid Authorization", 401)
    }

    await repo.event.deleteHighlight({ eventId: +eventId})

    res.status(200).json({ message: "Remove Success" })
})

// =========================================== feedBack ====================================== //
module.exports.createFeedback = utils.catchError(async (req, res, next) => {
    const { id } = req.user
    const { eventId } = req.params
    const { content, isLike } = req.body
    const feedBackData = { userId: +id, eventId: +eventId, content, isLike }

    await repo.event.createFeedback(feedBackData)

    res.status(200).json({ message: "create Feedback Success" })
})
