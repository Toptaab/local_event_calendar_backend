const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.getAll = async () => await prisma.event.findMany({include:{eventType:true,EventFacility:true,HighlightEvent:true,EventAddress:true,organizerInformation:{select:{officialName:true,profileImage:true }}}})

module.exports.get = async (id) => await prisma.event.findUnique({where:{id},include:{eventType:true,report:true,EventFeedback:true,EventImage:true,EventFacility:true,HighlightEvent:true,EventAddress:true,organizerInformation:{select:{officialName:true,profileImage:true }}}})



module.exports.create = async (data) => await prisma.event.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================