const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const data = require("./data-mockup")

async function seeding() {
    // ================================= Constants data ===============================//
    await prisma.province.createMany({ data: data.province })
    await prisma.eventType.createMany({ data: data.eventType })
    // ================================= Constants data ===============================//

    // ================================= mockupdata ===============================//
    await prisma.user.createMany({ data: data.user })
    await prisma.organizerInformation.createMany({ data: data.organizerInformation })
    await prisma.event.createMany({ data: data.event })
    await prisma.eventAddress.createMany({ data: data.eventAddress })
    await prisma.eventImage.createMany({ data: data.eventImage })
    // ================================= mockupdata ===============================//
}

seeding()
