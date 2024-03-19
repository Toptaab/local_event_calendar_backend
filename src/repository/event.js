const prisma = require("../config/prisma")
const today = new Date()
const targetDate = new Date(today)

// =========================================== BASIC CRUD ===================================
module.exports.getAll = async () =>
    await prisma.event.findMany({
        where: {
            startDate: {
                gt: today,
            },
        },
        orderBy: { startDate: "asc" },
        include: {
            category: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true } },
        },
    })

module.exports.getAllUpcomimng = async (targetDate) =>
    await prisma.event.findMany({
        where: {
            startDate: {
                gt: today,
                lt: targetDate,
            },
        },
        orderBy: { startDate: "asc" },
        include: {
            category: true,
            EventFacility: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true } },
        },
    })

module.exports.get = async (where) =>
    await prisma.event.findFirst({
        where,
        include: {
            category: true,
            EventFeedback: true,
            EventImage: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true, user: { select: { profileImage: true } } } },
        },
    })

module.exports.createEvent = async (data) => await prisma.event.create({ data })
module.exports.updateEvent = async (where, data) => prisma.event.update({ where, data })
module.exports.deleteEvent = async (where) => prisma.event.delete({ where })

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

module.exports.getRangeEvent = async (firstDay, lastDay) =>
    await prisma.event.findMany({
        where: {
            startDate: {
                gte: firstDay,
                lte: lastDay,
            },
        },
        include: {
            category: true,
            EventFacility: true,
            HighlightEvent: true,
            EventAddress: true,
            organizerInformation: { select: { officialName: true } },
        },
    })

// ============================================ event address ====================================== //

module.exports.createEventAddess = async (data) => await prisma.eventAddress.create({ data })
module.exports.updateEventAddess = async (where, data) => await prisma.eventAddress.update({ where, data })
module.exports.deleteEventAddess = async (where) => await prisma.eventAddress.delete({ where })

// ============================================ event facility ====================================== //

module.exports.createFacility = async (data) => await prisma.eventFacility.create({ data })
module.exports.updateFacility = async (where, data) => await prisma.eventFacility.update({ where, data })
module.exports.deleteFacility = async (where) => await prisma.eventFacility.delete({ where })

// ============================================ event HighlightEvent ================================= //

module.exports.getHighlight = async () =>
    await prisma.highlightEvent.findMany({
        include: {
            event: {
                include: {
                    category: true,
                    EventFacility: true,
                    HighlightEvent: true,
                    EventAddress: true,
                    organizerInformation: { select: { officialName: true } },
                },
            },
        },
    })

module.exports.deleteHighlightEvent = async (where) => prisma.highlightEvent.deleteMany({ where })

// ============================================ event Highlight ======================================== //

module.exports.createHighlight = async (data) => prisma.highlightEvent.create({ data })
module.exports.deleteHighlight = async (where) => prisma.highlightEvent.delete({ where })

// ============================================ event feedBack ======================================== //

module.exports.createFeedback = async (data) => prisma.eventFeedback.create({ data })
module.exports.deleteEventFeedback = async (where) => prisma.eventFeedback.deleteMany({ where })

// ============================================ event statistic ======================================== //

// module.exports.getMonthEvent = async (rawQuery) => prisma.$queryRawUnsafe(rawQuery)
