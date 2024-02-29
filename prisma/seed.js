const { PrismaClient, Role } = require("@prisma/client")
const prisma = new PrismaClient()
const bcrypt = require("bcryptjs")

password = "123456"
hashPassword = bcrypt.hashSync(password,10)


const ROLE = {
    USER: "USER",
    ADMIN: "ADMIN",
    ORGANIZER: "ORGANIZER"
  }
  
const GENDER = {
    MALE: "MALE",
    FEMALE: "FEMALE",
    OTHER: "OTHER"
  }
  
 const CORPORATION = {
    INDIVIDUAL: "INDIVIDUAL",
    CORPORATION: "CORPORATION"
  }


const user = [{
    userName: "toptaab",
    email: "toptaab@gmail.com",
    role:  ROLE.ADMIN,
    password: hashPassword,
    gender: GENDER.MALE
}]



async function seeding() {
    await prisma.user.createMany({data: user})

}


seeding()
