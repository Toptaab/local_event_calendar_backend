const prisma = require("../config/prisma");

module.exports.createEventImages = async (data) => prisma.eventImage.createMany({data})