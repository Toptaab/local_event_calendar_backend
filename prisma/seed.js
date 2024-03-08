const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const data = require("./data-mockup")

async function seeding() {
    // ================================= Constants data ===============================//
    await prisma.province.createMany({ data: data.province })
    await prisma.district.createMany({ data: data.district })
    await prisma.subDistrict.createMany({ data: data.subDistrict })
    await prisma.category.createMany({ data: data.category })
    // ================================= Constants data ===============================//

    // ================================= mockupdata ===============================//
    await prisma.user.createMany({ data: data.user })
    await prisma.userAddress.createMany({data: data.userAddress})
    await prisma.organizerInformation.createMany({ data: data.organizerInformation })
    await prisma.event.createMany({ data: data.event })
    await prisma.eventAddress.createMany({ data: data.eventAddress })
    await prisma.eventImage.createMany({ data: data.eventImage })
    await prisma.eventFacility.createMany({ data: data.eventFacility })
    await prisma.highlightEvent.createMany({data: data.highlight})
    // ================================= mockupdata ===============================//
}

seeding()
