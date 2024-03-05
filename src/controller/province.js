const utils = require("../utils");
const repo = require('../repository')



module.exports.getAll = utils.catchError(async (req,res,next) => {
    const provinces = await repo.province.getAll()

    res.status(200).json(provinces)
})