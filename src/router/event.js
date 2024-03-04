const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")

const eventRoute = express.Router()

eventRoute.get('/',c.event.getAll)
eventRoute.post('/radius',c.event.getAllWithinRadius)
eventRoute.post('/scope',c.event.getAllInScope)
eventRoute.get('/:eventId',c.event.getEvent)




module.exports = eventRoute
