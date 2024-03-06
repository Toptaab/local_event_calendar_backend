const prisma = require("../config/prisma")



module.exports.getAll = async () => prisma.province.findMany({include:{Districts:{include:{SubDistricts:true}}}})