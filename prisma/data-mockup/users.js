const utils = require("../../src/utils")

password = "123456"

hashPassword = utils.bcrypt.hashedsync(password)


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

module.exports = user = [
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