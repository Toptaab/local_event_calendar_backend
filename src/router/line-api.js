const express = require('express')
const lineRoute = express.Router()
const c = require("../controller")

lineRoute.post('/', () => console.log("line"))
lineRoute.get('/', () => console.log("linget"))

module.exports = lineRoute