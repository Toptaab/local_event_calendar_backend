const express = require("express")

const c = require("../controller")
const authenticate = require("../middlewares/authenticate")
const upload = require('../middlewares/upload')
const authentication = require('../middlewares/authenticate')

const userRoute = express.Router()



// ============================== done ============================//

userRoute.get("/", c.user.getAll)
userRoute.get("/auth",authentication ,c.user.authMe)
userRoute.get("/:userId", c.user.getUser)
userRoute.post("/login", c.user.login)
userRoute.post("/register",upload.fields([{name: 'profileImage',maxCount: 1},{name: 'identityCopyImage', maxCount: 1}]) ,c.user.register)

// =============================== ongoing =======================//
userRoute.put("/:id",upload.fields([{name: 'profileImage',maxCount: 1},{name: 'identityCopyImage', maxCount: 1}]) , c.user.update)
userRoute.delete("/:id", authentication, c.user.delete)

module.exports = userRoute
