const utils = require("../utils");

module.exports.lineWebhook = utils.catchError(async(req,res,next)=>{
    res.status(200).json({message: "ok"})
})