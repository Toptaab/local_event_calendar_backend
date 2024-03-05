const prisma = require("../config/prisma");

module.exports.getAll = async () => prisma.category.findMany()