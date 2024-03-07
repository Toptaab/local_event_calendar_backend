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
        profileImage: "https://thumbs.dreamstime.com/z/thailand-set-thai-color-vector-icons-symbols-vector-ill-welcome-to-illustration-87289028.jpg",
    },
    {
        userName: "pat", //2
        email: "pat@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage : "https://th.bing.com/th/id/OIP.pJztKQB6O2XiBOH5dYKrEAHaHS?rs=1&pid=ImgDetMain",
    },
    {
        userName: "japan", //3
        email: "japan@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage : "https://th.bing.com/th/id/OIP.HqU6JcRt098Mx_d4IZz9zwHaHa?w=750&h=750&rs=1&pid=ImgDetMain",
    },
    {
        userName: "guide", //4
        email: "guide@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage : "https://th.bing.com/th/id/OIP.DK2UEaUeOfHQwZW7B-7VSQHaH5?w=1500&h=1600&rs=1&pid=ImgDetMain",
    },
    {
        userName: "bank", //5
        email: "bank@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage : "https://th.bing.com/th/id/OIP.QseD9dmPTFj_wRqT19aqZQHaFu?w=1500&h=1159&rs=1&pid=ImgDetMain",
    },
    {
        userName: "pete", //6
        email: "pete@gmail.com",
        role: ROLE.ORGANIZER,
        password: hashPassword,
        gender: GENDER.MALE,
        profileImage : "https://th.bing.com/th/id/OIP.Ye6XgiE5PriIzghoTwpspAHaHa?w=300&h=300&rs=1&pid=ImgDetMain",
    },
]