const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const catchError = require("../utils/catchError")

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

