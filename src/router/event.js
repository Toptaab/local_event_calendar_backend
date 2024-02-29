const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")

const eventRoute = express.Router()


module.exports = eventRoute
