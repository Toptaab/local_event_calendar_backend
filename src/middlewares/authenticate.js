const jwt = require("jsonwebtoken")
const prisma = require("../config/prisma")
const {CustomError} = require("../config/error")

module.exports = async function authenticate(req, res, next) {
    try {
        if (!req.headers.authorization){throw new CustomError("Need Credential","InvalidToken",400)}
        const authorization = req?.headers?.authorization.startsWith("Bearer")
            ? req.headers.authorization
            : next(new CustomError("Not found Bearer accessToken", "InvalidToken", 400))

        const accessToken = authorization.split(" ")[1] ? authorization.split(" ")[1] : next(new CustomError("Not found Bearer accessToken", "InvalidToken", 400))
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET_KEY ?? "key")

        const data = await prisma.user.findUnique({ where: { id: decoded.id }})
        if (!data) next(new CustomError("Your accound has been delete", "NotFoundData", 500))
        req.user = data
        next()
    } catch (err) {
        next(err)
    }
}
