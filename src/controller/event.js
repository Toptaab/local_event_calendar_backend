const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")



module.exports.getAll = async (req,res,next) => {
    try {
        const allEvent = await repo.event.getAll()
        
        res.status(200).json(allEvent)
    } catch (error) {
        next(err)
    }
}