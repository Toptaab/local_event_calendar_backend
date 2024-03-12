const express = require('express')
const lineRoute = express.Router()
const c = require("../controller")

lineRoute.post('/', c.line.lineWebhook)
// lineRoute.get('/', () => console.log("linget"))

module.exports = lineRoute