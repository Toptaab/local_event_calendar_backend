const repo = require("../repository")
const utils = require("../utils")
const { CustomError } = require("../config/error")
const { Role } = require("@prisma/client")
const { profilePath, IdentityPath } = require("../constant/cludinaryPath")
const fs = require("fs")

module.exports.getAll = utils.catchError(async (req, res, next) => {
    const users = await repo.user.getAll()
    res.status(200).json({ users })
})

module.exports.getUser = utils.catchError(async (req, res, next) => {
    const { userId } = req.params

    const user = await repo.user.getUser({ id: +userId })

    delete user.password
    res.status(200).json({ user })
})

module.exports.authMe = utils.catchError(async (req, res, next) => {
    const { id } = req.user

    const user = await repo.user.getUser({ id })

    delete user.password
    res.status(200).json(user)
})

module.exports.login = utils.catchError(async (req, res, nexr) => {
    const { email, password } = req.body
    // GET username from database
    const user = await repo.user.getUser({ email })
    if (!user) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // COMPARE password with database
    const result = await utils.bcrypt.compare(password, user.password)
    if (!result) throw new CustomError("username or password is wrong", "WRONG_INPUT", 400)

    // DELETE KEY of password from user data
    delete user.password
    // SIGN token from user data
    const accessToken = utils.jwt.sign({ id: user.id })
    res.status(200).json({ accessToken })
})

module.exports.register = utils.catchError(async (req, res, next) => {
    const { profileImage, identityCopyImage } = req.files
    const { userName, password, email, lineToken, gender, role } = req.body
    //GUARD
    //VALIDATION CONFLICT email
    const existEmail = await repo.user.getUser({ email })
    if (existEmail) {
        throw new CustomError("this email has aleady been used", "CONFLICT_USER", 400)
    }
    //VALIDATION CONFLICT line token
    if (lineToken) {
        const existToken = await repo.user.getUser({ lineToken })
        if (existToken) {
            {
                throw new CustomError("this line token has aleady been used", "CONFLICT_USER", 400)
            }
        }
    }
    // HASHED PASSWORD
    const hashed = await utils.bcrypt.hashed(password)

    //Role case
    let user
    let profileResult
    let identityCopyImageResult

    // upload profile image
    if (profileImage) {
        profileResult = await utils.cloudinary.uploadImage(profileImage[0].path, profilePath)
    }

    switch (role) {
        // CREATE user to database
        case Role.USER:
            user = await repo.user.create({ userName, password: hashed, email, role, gender, profileImage: profileResult.secure_url })
            // delete local image
            fs.unlink(profileImage[0].path, () => {})
            break

        //  CREATE user to database for organizer role
        case Role.ORGANIZER:
            user = await repo.user.create({ userName, password: hashed, email, role, gender, profileImage: profileResult.secure_url })
            const { officialName, corporation, companyNumber } = req.body
            if (identityCopyImage) {
                identityCopyImageResult = await utils.cloudinary.uploadImage(identityCopyImage[0].path, IdentityPath)
            }
            await repo.user.createOrganizerInfomation({
                userId: +user.id,
                officialName,
                corporation,
                companyNumber: +companyNumber,
                identityCopyImage: identityCopyImageResult.secure_url,
            })
            // delete local image
            fs.unlink(profileImage[0].path, () => {})
            fs.unlink(identityCopyImage[0].path, () => {})
            break

        // CREATE admin to database
        case Role.ADMIN:
            user = await repo.user.create({ userName, password: hashed, email, role })
            break
        default:
            throw new CustomError("user role needed", "", 400)
    }

    // DELETE KEY of password from user data
    delete user.password
    // SIGN token from user data
    const accessToken = utils.jwt.sign({ id: user.id })

    res.status(200).json({ accessToken })
})


module.exports.createRemider = utils.catchError(async(req,res,next) => {
    const { id } = req.user
    const { eventId } = req.params
    await repo.remider.createRemider({userId: +id, eventId: +eventId})
    res.status(200).json({message: "set remider success"})
})




// =========================================== on going ====================================== //



module.exports.update = utils.catchError(async (req, res, next) => {
    const { userId } = req.params
    const { profileImage, identityCopyImage } = req.files
    const { userName, password, email, lineToken, gender } = req.body

    const { firstName, lastName } = req.body
    // const user = await repo.user.update({ id }, { firstName, lastName })
})
;async (req, res, next) => {
    try {
        res.status(200).json({ user })
    } catch (err) {
        next(err)
    }
    return
}

module.exports.delete = async (req, res, next) => {
    try {
        const { id } = req.params
        await repo.user.delete({ id })
        res.status(200)
    } catch (err) {
        next(err)
    }
    return
}
