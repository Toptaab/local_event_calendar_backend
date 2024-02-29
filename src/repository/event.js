const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.getAll = async () => await prisma.event.findMany({include:{EventFacility:true,HighlightEvent:true,EventAddress:true,organizerInformation:{select:{officialName:true,profileImage:true }}}})


module.exports.get = async (where) => await prisma.event.findUnique({ where })
module.exports.create = async (data) => await prisma.event.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================