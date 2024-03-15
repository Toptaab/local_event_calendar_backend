const prisma = require("../config/prisma")

// =========================================== BASIC CRUD =================================== //
module.exports.getUser = async (where) => await prisma.user.findFirst({ where,include:{UserAddress:true,Reminder:{include:{event:true}},OrganizerInformation:{include:{Event:true}}} })
module.exports.getAll = async (where) => await prisma.user.findMany({where})
module.exports.create = async (data) => await prisma.user.create({ data })
module.exports.update = async ( where , data) => await prisma.user.update({ where, data })
module.exports.delete = async ( where ) => await prisma.user.delete({ where })

// =========================================== USER Address =================================== //

module.exports.userAddressUpdate = async ( where , data) => await prisma.userAddress.update({ where, data })

// =========================================== CUSTOM REPOSITORY ===================================

module.exports.createOrganizerInfomation = async (data) => await prisma.organizerInformation.create({data})
module.exports.getOrganizer = async (where) => await prisma.user.findFirst({ where })