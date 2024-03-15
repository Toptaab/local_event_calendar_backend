const express = require("express")

const c = require("../controller")
const authentication = require("../middlewares/authenticate")

const upload = require('../middlewares/upload')

const eventRoute = express.Router()


// ============================== done ============================//
eventRoute.get('/',c.event.getAll)
eventRoute.get('/upcoming',c.event.getAllUpcomimng)
eventRoute.get('/:eventId',c.event.getEvent)
eventRoute.post('/',authentication,upload.fields([{name: 'coverImage',maxCount: 1},{name: 'image'}]), c.event.createEvent)
eventRoute.post('/inRange',c.event.getinRange)
eventRoute.post('/scope',c.event.getAllInScope)
eventRoute.post('/filter',c.event.getFilteredEvent)
eventRoute.post('/highlight',authentication,c.event.createHighlight)
eventRoute.post('/:eventId/feedback',authentication,c.event.createFeedback)
eventRoute.put('/:eventId',authentication,upload.single('coverImage'), c.event.updateEvent) // update onlt information and coverImage
eventRoute.delete('/highlight',authentication,c.event.deleteHighlight)
eventRoute.delete('/:eventId',authentication,c.event.deleteEvent) 

// =============================== ongoing =======================//







module.exports = eventRoute