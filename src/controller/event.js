const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const geolib = require('geolib');


module.exports.getAll = async (req,res,next) => {
    try {
        const allEvent = await repo.event.getAll()
        
        res.status(200).json(allEvent)
    } catch (error) {
        next(err)
    }
}

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