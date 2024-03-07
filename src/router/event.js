const express = require("express")

const c = require("../controller")
const authentication = require("../middlewares/authenticate")

const upload = require('../middlewares/upload')

const eventRoute = express.Router()

eventRoute.get('/',c.event.getAll)
eventRoute.get('/:eventId',c.event.getEvent)
eventRoute.post('/',upload.fields([{name: 'coverImage',maxCount: 1},{name: 'image'}]),authentication, c.event.createEvent)
eventRoute.post('/scope',c.event.getAllInScope)
eventRoute.post('/filter',c.event.getFilteredEvent)




module.exports = eventRoute