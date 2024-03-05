const repo = require("../repository");
const utils = require("../utils");



exports.getAll = utils.catchError(async (req,res,next) => {
    const categories = await repo.category.getAll()

    res.status(200).json(categories)
})