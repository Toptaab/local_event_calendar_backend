const prisma = require("../config/prisma");

module.exports.createEventImages = async (data) => prisma.eventImage.createMany({data})
module.exports.deleteEventImages = async (where) => prisma.eventImage.deleteMany({where})