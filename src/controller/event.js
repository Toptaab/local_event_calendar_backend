const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const geolib = require('geolib');


exports.getAll = utils.catchError(async (req, res, next) => {
    const allEvent = await repo.event.getAll()
    res.status(200).json(allEvent)
})

exports.getEvent = utils.catchError(async (req, res, next) => {
    const event = await repo.event.get(+req.params.eventId)
    res.status(200).json(event)
})


exports.createEvent = utils.catchError(async (req,res,next) => {

})



module.exports.getAllWithinRadius = async (req,res,next) => {
    try {
        // Central point coordinates
        const centralPoint = { latitude: 40.7128, longitude: -74.0060 };

        // Distance in meters
        const distance = 5000; // 5 kilometers
        const bounds = geolib.getBoundsOfDistance(centralPoint, distance);
        console.log(bounds);

        // const allEvent = await repo.event.getAllInScope(bounds)
        
        // res.status(200).json(allEvent)
    } catch (error) {
        next(err)
    }
}