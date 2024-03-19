const express = require('express')
const categoryRoute = express.Router()
const c = require("../controller")


categoryRoute.get('/', c.category.getAll)


module.exports = categoryRoute