const repo = require("../repository")
const utils = require("../utils")

module.exports.lineWebhook = utils.catchError(async (req, res, next) => {
    console.log(req.body)
    console.log(req.body.events[0].source)
    console.log(req.params)

    res.status(200).json({ message: "ok" })
})

module.exports.login = utils.catchError(async (req, res, next) => {
    const { ...lineAccess } = req.body
    const {id}  = req.user

    const user = utils.jwt.decode(lineAccess.id_token)

    const result = await repo.user.update({id:+id},{lineToken:user.sub})

    res.status(200).json(result)
})

module.exports.pushContent= utils.catchError(async(req,res,next) =>{



    res.status(200).json({message: "ok push"})
})
