const express = require("express")

const c = require("../controller")
const authentication = require("../middlewares/authenticate")

const upload = require('../middlewares/upload')

const eventRoute = express.Router()

eventRoute.get('/',c.event.getAll)
eventRoute.get('/:eventId',c.event.getEvent)
eventRoute.post('/',authentication,upload.fields([{name: 'coverImage',maxCount: 1},{name: 'image'}]), c.event.createEvent)
eventRoute.post('/radius',c.event.getAllWithinRadius)
eventRoute.post('/scope',c.event.getAllInScope)




module.exports = eventRoute
