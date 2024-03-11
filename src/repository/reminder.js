const prisma = require("../config/prisma");


module.exports.createReminder = async (data) => await prisma.reminder.create({data})
module.exports.deleteReminder = async (userId,eventId) => await prisma.reminder.deleteMany({where:{AND:[userId,eventId]}})


module.exports.deleteReminderByEventId = async (where) => await prisma.reminder.deleteMany({where})