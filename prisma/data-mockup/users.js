const utils = require("../../src/utils")

password = "123456"

hashPassword = utils.bcrypt.hashedsync(password)
const profileImage = "https://download-th.com/wp-content/uploads/2020/12/TAT.jpg"


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
        profileImage,
    },
    {
        userName: "pat", //2
        email: "pat@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage,
    },
    {
        userName: "japan", //3
        email: "japan@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage,
    },
    {
        userName: "guide", //4
        email: "guide@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage,
    },
    {
        userName: "bank", //5
        email: "bank@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage,
    },
    {
        userName: "pete", //6
        email: "pete@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage,
    },
]