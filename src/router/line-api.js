const express = require('express')
const lineRoute = express.Router()
const c = require("../controller")
const authentication = require("../middlewares/authenticate")

lineRoute.post('/', c.line.lineWebhook)
lineRoute.post('/binding',authentication ,c.line.login)
lineRoute.get('/push',c.line.pushContent)

module.exports = lineRoute