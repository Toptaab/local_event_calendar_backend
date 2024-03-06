const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const geolib = require("geolib")

exports.getAll = utils.catchError(async (req, res, next) => {
    const allEvent = await repo.event.getAll()
    res.status(200).json(allEvent)
})

exports.getEvent = utils.catchError(async (req, res, next) => {
    const event = await repo.event.get(+req.params.eventId)
    res.status(200).json(event)
})

exports.createEvent = utils.catchError(async (req, res, next) => {
 const event = await repo.event.create()


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
