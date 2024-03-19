const express = require('express')
const provinceRoute = express.Router()
const c = require("../controller")


provinceRoute.get('/', c.province.getAll)

module.exports = provinceRoute