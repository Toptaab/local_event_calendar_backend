const prisma = require("../config/prisma")



module.exports.getAll = async () => await prisma.province.findMany({include:{Districts:{include:{SubDistricts:true}}}})