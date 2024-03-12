const utils = require("../utils");

module.exports.lineWebhook = utils.catchError(async(req,res,next)=>{
    console.log(req.body)
    console.log(req.body.events[0].source)
    console.log(req.params)

    res.status(200).json({message: "ok"})
})