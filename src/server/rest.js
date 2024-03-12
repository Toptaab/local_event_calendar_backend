//=====================================================Imported Zone
const express = require("express")
const { json, urlencoded } = require("express")
const cors = require("cors")
const morgan = require("morgan")
// const bodyParser = require("body-parser")



//=====================================================local consted Zone

const { notFound } = require("../middlewares/notFound")
const { errorMiddlewares } = require("../middlewares/error")
const CustomError = require("../config/error")
const userRoute = require("../router/user")
const eventRoute = require("../router/event")
const provinceRoute = require('../router/province')
const categoryRoute = require("../router/category")
const lineRoute = require("../router/line-api")
const path = require("path")

const staticPath = path.join(__dirname,"../../public")

//=====================================================Server Zone
module.exports = function restApiServer(app) {
    //=====================================================Encoding Zone
    app.use(morgan("dev"))
    app.use(cors())
    app.use(json())
    app.use(urlencoded({ extended: false }))
    app.use(express.static(staticPath))

    //=====================================================Routing Zone
    app.use("/ping", (req, res, next) => {
        try {
            console.log("Checking the API status: Everything is OK")
            res.status(200).json("pong")
        } catch (error) {
            next(new CustomError("Ping Error", "NotFoundData", 500))
        }
    })
    app.use("/public", express.static(staticPath))
    app.use("/user", userRoute)
    app.use("/event", eventRoute)
    app.use("/province", provinceRoute)
    app.use("/category", categoryRoute)
    app.use("/line", lineRoute)



    //=====================================================Throwing Zone
    app.use(notFound)
    app.use(errorMiddlewares)
}
