const prisma = require("../config/prisma")

// =========================================== BASIC CRUD ===================================
module.exports.get = async (where) => await prisma.event.findUnique({ where })
module.exports.getAll = async () => await prisma.event.findMany()
module.exports.create = async (data) => await prisma.event.create({ data })

// =========================================== CUSTOM REPOSITORY ===================================