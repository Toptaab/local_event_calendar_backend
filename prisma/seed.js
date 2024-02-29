const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")
const { province } = require("./province")

password = "123456"
hashPassword = bcrypt.hashSync(password, 10)

const ROLE = {
    USER: "USER",
    ADMIN: "ADMIN",
    ORGANIZER: "ORGANIZER",
}

const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER",
}

const CORPORATION = {
    INDIVIDUAL: "INDIVIDUAL",
    CORPORATION: "CORPORATION",
}

const organizeImage = "https://download-th.com/wp-content/uploads/2020/12/TAT.jpg"
const identityImage = "https://www.dmv.ca.gov/portal/uploads/2020/06/realid_img-1024x656.jpg"

const user = [
    {
        userName: "toptaab", //1
        email: "toptaab@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
    {
        userName: "pat", //2
        email: "pat@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
    {
        userName: "japan", //3
        email: "japan@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
    {
        userName: "guide", //4
        email: "guide@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
    {
        userName: "bank", //5
        email: "bank@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
    {
        userName: "pete", //6
        email: "pete@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
    },
]

const organizerInformation = [
    {
        userId: 1,
        officialName: "Top Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
    {
        userId: 2,
        officialName: "Pat Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
    {
        userId: 3,
        officialName: "japan Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
    {
        userId: 4,
        officialName: "guide Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
    {
        userId: 5,
        officialName: "bank Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
    {
        userId: 6,
        officialName: "pete Thailand",
        corporation: CORPORATION.CORPORATION,
        identityCopyImage: identityImage,
        profileImage: organizeImage,
    },
]

const eventType = [
    {
        name: "Cultural ",
    },
    {
        name: "Community ",
    },
    {
        name: "Sports ",
    },
    {
        name: "Music ",
    },
    {
        name: "Art ",
    },
    {
        name: "Historical  ",
    },
]

// const theme = [{

// }]




const events = [
    {
        organizerInformationId: 1,
        coverImage: "https://picsum.photos/600/300",
        title: "Watarun",
        description: "the best wat in thailand",
        startDate: new Date("2024-10-03"),
        endDate: new Date("2024-12-03"),
        eventTypeId: 1,
        timePeriod: "08:00 AM - 05:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 2,
        coverImage: "https://picsum.photos/600/300",
        title: "Adventure Fest",
        description: "Explore the wonders of nature",
        startDate: new Date("2024-08-10"),
        endDate: new Date("2024-12-10"),
        eventTypeId: 2,
        timePeriod: "09:00 AM - 06:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 3,
        coverImage: "https://picsum.photos/600/300",
        title: "Culinary Delight",
        description: "A feast for food lovers",
        startDate: new Date("2024-07-12"),
        endDate: new Date("2024-11-12"),
        eventTypeId: 3,
        timePeriod: "11:00 AM - 08:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 4,
        coverImage: "https://picsum.photos/600/300",
        title: "Tech Expo",
        description: "Innovations that shape the future",
        startDate: new Date("2024-09-08"),
        endDate: new Date("2024-05-08"),
        eventTypeId: 4,
        timePeriod: "10:00 AM - 07:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 5,
        coverImage: "https://picsum.photos/600/300",
        title: "Fusion Beats",
        description: "A musical journey across genres",
        startDate: new Date("2024-11-15"),
        endDate: new Date("2024-12-15"),
        eventTypeId: 5,
        timePeriod: "03:00 PM - 11:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 6,
        coverImage: "https://picsum.photos/600/300",
        title: "Artistic Vibes",
        description: "Celebrating creativity in all forms",
        startDate: new Date("2024-06-09"),
        endDate: new Date("2024-10-09"),
        eventTypeId: 6,
        timePeriod: "09:30 AM - 06:30 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 1,
        coverImage: "https://picsum.photos/600/300",
        title: "Mindful Retreat",
        description: "Embrace tranquility and peace",
        startDate: new Date("2024-04-11"),
        endDate: new Date("2024-06-11"),
        eventTypeId: 1,
        timePeriod: "10:00 AM - 06:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 2,
        coverImage: "https://picsum.photos/600/300",
        title: "Gastronomy Gala",
        description: "A culinary journey around the world",
        startDate: new Date("2024-12-14"),
        endDate: new Date("2024-12-30"),
        eventTypeId: 2,
        timePeriod: "12:00 PM - 09:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 3,
        coverImage: "https://picsum.photos/600/300",
        title: "Code Confluence",
        description: "Where coding brilliance meets",
        startDate: new Date("2024-03-13"),
        endDate: new Date("2024-05-13"),
        eventTypeId: 2,
        timePeriod: "01:30 PM - 09:30 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 4,
        coverImage: "https://picsum.photos/600/300",
        title: "Fashion Fiesta",
        description: "A showcase of style and trends",
        startDate: new Date("2024-02-16"),
        endDate: new Date("2024-03-16"),
        eventTypeId: 3,
        timePeriod: "04:00 PM - 11:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 5,
        coverImage: "https://picsum.photos/600/300",
        title: "Health Harmony",
        description: "Wellness for mind and body",
        startDate: new Date("2024-05-10"),
        endDate: new Date("2024-10-10"),
        eventTypeId: 4,
        timePeriod: "09:00 AM - 05:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 6,
        coverImage: "https://picsum.photos/600/300",
        title: "Cultural Carnival",
        description: "Diverse traditions under one roof",
        startDate: new Date("2024-07-12"),
        endDate: new Date("2024-09-12"),
        eventTypeId: 5,
        timePeriod: "11:30 AM - 08:30 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 1,
        coverImage: "https://picsum.photos/600/300",
        title: "Tech Summit",
        description: "Exploring the future of technology",
        startDate: new Date("2024-09-08"),
        endDate: new Date("2024-12-08"),
        eventTypeId: 6,
        timePeriod: "10:00 AM - 06:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 1,
        coverImage: "https://picsum.photos/600/300",
        title: "Watarun",
        description: "the best wat in thailand",
        startDate: new Date("2024-10-03"),
        endDate: new Date("2024-11-03"),
        eventTypeId: 1,
        timePeriod: "08:00 AM - 05:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 2,
        coverImage: "https://picsum.photos/600/300",
        title: "Adventure Fest",
        description: "Explore the wonders of nature",
        startDate: new Date("2024-08-10"),
        endDate: new Date("2024-09-10"),
        eventTypeId: 2,
        timePeriod: "09:00 AM - 06:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 3,
        coverImage: "https://picsum.photos/600/300",
        title: "Culinary Delight",
        description: "A feast for food lovers",
        startDate: new Date("2024-07-12"),
        endDate: new Date("2024-12-12"),
        eventTypeId: 3,
        timePeriod: "11:00 AM - 08:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 4,
        coverImage: "https://picsum.photos/600/300",
        title: "Tech Expo",
        description: "Innovations that shape the future",
        startDate: new Date("2024-09-08"),
        endDate: new Date("2024-10-08"),
        eventTypeId: 4,
        timePeriod: "10:00 AM - 07:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 5,
        coverImage: "https://picsum.photos/600/300",
        title: "Fusion Beats",
        description: "A musical journey across genres",
        startDate: new Date("2024-11-15"),
        endDate: new Date("2024-12-15"),
        eventTypeId: 5,
        timePeriod: "03:00 PM - 11:00 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
    {
        organizerInformationId: 6,
        coverImage: "https://picsum.photos/600/300",
        title: "Artistic Vibes",
        description: "Celebrating creativity in all forms",
        startDate: new Date("2024-06-09"),
        endDate: new Date("2024-10-09"),
        eventTypeId: 6,
        timePeriod: "09:30 AM - 06:30 PM",
        isYearly: false,
        isPublish: true,
        isExpire: false,
    },
]

const provinces = province

const eventAddress = [
    { eventId: 1, address: "123 Main Street, Bangkok", provinceId: 1, lat: 13.7563, long: 100.5018 },
    { eventId: 2, address: "456 Elm Street, Phuket", provinceId: 2, lat: 7.8804, long: 98.3923 },
    { eventId: 3, address: "789 Oak Street, Chiang Mai", provinceId: 3, lat: 18.7903, long: 98.9847 },
    { eventId: 4, address: "101 Maple Street, Ayutthaya", provinceId: 4, lat: 14.3588, long: 100.5582 },
    { eventId: 5, address: "202 Pine Street, Samut Prakan", provinceId: 5, lat: 13.6529, long: 100.4887 },
    { eventId: 6, address: "303 Birch Street, Nakhon Pathom", provinceId: 6, lat: 13.8196, long: 100.0443 },
    { eventId: 7, address: "404 Cedar Street, Songkhla", provinceId: 7, lat: 7.1898, long: 100.5951 },
    { eventId: 8, address: "505 Fir Street, Udon Thani", provinceId: 8, lat: 17.415, long: 102.7855 },
    { eventId: 9, address: "606 Spruce Street, Khon Kaen", provinceId: 9, lat: 16.4467, long: 102.833 },
    { eventId: 10, address: "707 Redwood Street, Nakhon Ratchasima", provinceId: 10, lat: 14.9799, long: 102.0977 },
    { eventId: 11, address: "808 Walnut Street, Surat Thani", provinceId: 11, lat: 9.1347, long: 99.3331 },
    { eventId: 12, address: "909 Pine Street, Chiang Rai", provinceId: 12, lat: 19.9072, long: 99.8308 },
    { eventId: 13, address: "111 Maple Street, Phra Nakhon Si Ayutthaya", provinceId: 13, lat: 14.3559, long: 100.5679 },
    { eventId: 14, address: "121 Elm Street, Nakhon Sawan", provinceId: 14, lat: 15.672, long: 100.1313 },
    { eventId: 15, address: "131 Oak Street, Rayong", provinceId: 15, lat: 12.6819, long: 101.2813 },
    { eventId: 16, address: "141 Cedar Street, Nakhon Nayok", provinceId: 16, lat: 14.2037, long: 101.214 },
    { eventId: 17, address: "151 Fir Street, Trang", provinceId: 17, lat: 7.5596, long: 99.6107 },
    { eventId: 18, address: "161 Birch Street, Sakon Nakhon", provinceId: 18, lat: 17.1628, long: 104.1479 },
    { eventId: 19, address: "171 Redwood Street, Pattaya", provinceId: 19, lat: 12.9316, long: 100.8828 },
]

const eventImage = [
    {
        eventId: 1,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 1,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 1,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 1,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 1,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 2,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 3,
        image: "https://picsum.photos/600/600",
    },
    {
        eventId: 4,
        image: "https://picsum.photos/600/600",
    },
]

async function seeding() {
    await prisma.user.createMany({ data: user })
    await prisma.organizerInformation.createMany({ data: organizerInformation })
    await prisma.eventType.createMany({ data: eventType })
    await prisma.event.createMany({ data: events })
    await prisma.province.createMany({ data: provinces })
    await prisma.eventAddress.createMany({ data: eventAddress })
    await prisma.eventImage.createMany({data: eventImage})


}

seeding()
