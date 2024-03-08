const prisma = require("../config/prisma");


module.exports.createRemider = async (data) => await prisma.reminder.create({data})