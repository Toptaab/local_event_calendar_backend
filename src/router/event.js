const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")

const eventRoute = express.Router()

eventRoute.get('/',c.event.getAll)
eventRoute.get('/:eventId',c.event.getEvent)


module.exports = eventRoute
