const prisma = require("../config/prisma")

module.exports.findReminder = async (today, targetDay) =>
    await prisma.reminder.findMany({
        where: {
            event: {
                startDate: {
                    gte: today,
                    lte: targetDay,
                },
            },
        },
        include: { event: true,user:true },
    })
module.exports.createReminder = async (data) => await prisma.reminder.create({ data })
module.exports.deleteReminder = async (userId, eventId) => await prisma.reminder.deleteMany({ where: { AND: [userId, eventId] } })

module.exports.deleteReminderByEventId = async (where) => await prisma.reminder.deleteMany({ where })
