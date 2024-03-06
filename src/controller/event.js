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
    const data = req.body
    data.organizerInformationId = req.user.id
    const { coverImage, image } = req.files

    // Gurd boolean and string
    if(data.isYearly === "true"){data.isYearly = true}
    else{data.isYearly = false}
    data.categoryId = +data.categoryId
    data.provinceId = +data.provinceId
    // data.districtId = +data.districtId
    // data.subDistrictId = +data.subDistrictId
    
    


    // UPLOAD coverImage to Cloudinary
    const coverImageUrl = await utils.uploadImage(coverImage[0].path, coverImagePath)
    data.coverImage = coverImageUrl.secure_url

    // CREATE event
    const event = await repo.event.createEvent( data )

    // UPLOAD eventImage to Cloudinary
    const eventData = []
    for (file of image) {
        const { path } = file
        const eventImageUrl = await utils.uploadImage(path, eventImagePath)
        eventData.push({ eventId: event.id, image: eventImageUrl.secure_url })
    }

    // CREATE eventImage
    await repo.eventImage.createEventImages(eventData)


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
