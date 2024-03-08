const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.getAll = async () =>
    await prisma.event.findMany({
        orderBy: { startDate: "asc" },
        include: {
            category: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true } },
        },
    })

module.exports.get = async (where) =>
    await prisma.event.findUnique({
        where,
        include: {
            category: true,
            report: true,
            EventFeedback: true,
            EventImage: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true, user: { select: { profileImage: true } } } },
        },
    })

module.exports.createEvent = async (data) => await prisma.event.create({ data })

// =========================================== event map =========================================

module.exports.getAllInScope = async ({ minLat, maxLat, minLon, maxLon }) =>
    await prisma.event.findMany({
        where: {
            EventAddress: {
                AND: [{ lat: { gte: minLat, lte: maxLat } }, { long: { gte: minLon, lte: maxLon } }],
            },
        },
        include: {
            EventAddress: true,
        },
    })

// ============================================ filter event ======================================

module.exports.getFilteredEvent = async (where) =>
    await prisma.event.findMany({
        where,
        orderBy: { startDate: "asc" },
        include: {
            category: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true } },
        },
    })

// ============================================ event address ======================================

module.exports.createEventAddess = async (data) => await prisma.eventAddress.create({ data })


// ============================================ event facility ======================================

module.exports.createFacility =async (data) => await prisma.eventFacility.create({data})