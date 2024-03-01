const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.get = async (where) => await prisma.event.findUnique({ where })
module.exports.getAll = async () => await prisma.event.findMany({ include: { organizer: { select: {} } } })
module.exports.create = async (data) => await prisma.event.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================
module.exports.getAllInScope = async ({minLat, maxLat, minLon, maxLon}) =>
    await prisma.event.findMany({
        where: {
            EventAddress: {
                AND: [
                    { lat: { gte: minLat, lte: maxLat } }, 
                    { long: { gte: minLon, lte: maxLon } }
                ],
            },
        },
        include: {
            organizer: {
                select: {},
            },
        },
    })