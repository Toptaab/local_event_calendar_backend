const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const geolib = require("geolib")
const { coverImagePath, eventImagePath } = require("../constant/cludinaryPath")
const fs = require("fs")

exports.getAll = utils.catchError(async (req, res, next) => {
    const allEvent = await repo.event.getAll()
    res.status(200).json(allEvent)
})

exports.getEvent = utils.catchError(async (req, res, next) => {
    const { eventId } = req.params

    const event = await repo.event.get({ id: +eventId })
    res.status(200).json(event)
})

exports.createEvent = utils.catchError(async (req, res, next) => {
    const { provinceId, districtId, subDistrictId, address, lat, long, ...eventData } = req.body
    const { coverImage, image } = req.files

    eventData.organizerInformationId = req.user.id
    eventData.categoryId = +eventData.categoryId

    // Gurd boolean and string
    if (eventData.isYearly === "true") {
        eventData.isYearly = true
    } else {
        eventData.isYearly = false
    }

    // UPLOAD coverImage to Cloudinary
    const coverImageUrl = await utils.uploadImage(coverImage[0].path, coverImagePath)
    eventData.coverImage = coverImageUrl.secure_url

    // CREATE event
    const event = await repo.event.createEvent(eventData)

    // CREATE event address
    const eventAdressData = { provinceId, districtId, subDistrictId, address, lat, long,eventId: event.id }
    for (const key in eventAdressData) {
        if (key !== "address") {
            eventAdressData[key] = +eventAdressData[key]
        }
    }
    await repo.event.createEventAddess(eventAdressData)

    // UPLOAD eventImage to Cloudinary
    const eventImageData = []
    for (file of image) {
        const { path } = file
        const eventImageUrl = await utils.uploadImage(path, eventImagePath)
        eventImageData.push({ eventId: event.id, image: eventImageUrl.secure_url })
    }

    // CREATE eventImage
    await repo.eventImage.createEventImages(eventImageData)

    // Delete image in public folder
    fs.unlink(coverImage[0].path, () => {})
    for (file of image) {
        const { path } = file
        fs.unlink(path, () => {})
    }
    res.status(200).json(event.id)
})

module.exports.getAllWithinRadius = utils.catchError(async (req, res, next) => {
    // const { distance, centralPoint } = req.body

    // Central point coordinates \
    const centralPoint = { latitude: 13.6529, longitude: 100.4887 }

    // Distance in meters
    const distance = 5000 // 5 kilometers

    //find scope
    const bounds = geolib.getBoundsOfDistance(centralPoint, distance)
    console.log(bounds)
    const { latitude: minLat, longitude: minLon } = bounds[0]
    const { latitude: maxLat, longitude: maxLon } = bounds[1]

    // console.log(minLat,minLon,maxLat,maxLon);
    const allEvent = await repo.event.getAllInScope({ minLat, minLon, maxLat, maxLon })

    res.status(200).json(allEvent)
})

module.exports.getAllInScope = utils.catchError(async (req, res, next) => {
    const { _southWest, _northEast } = req.body
    const { lat: minLat, lng: minLon } = _southWest
    const { lat: maxLat, lng: maxLon } = _northEast

    const allEvent = await repo.event.getAllInScope({ minLat, minLon, maxLat, maxLon })
    console.log(allEvent)

    res.status(200).json(allEvent)
})
