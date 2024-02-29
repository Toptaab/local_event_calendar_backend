const { PrismaClient, Role, Corporation } = require("@prisma/client")
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
  
  const organizeImage = "https://download-th.com/wp-content/uploads/2020/12/TAT.jpg"
  const identityImage = "https://www.dmv.ca.gov/portal/uploads/2020/06/realid_img-1024x656.jpg"


const user = [{
    userName: "toptaab", //1
    email: "toptaab@gmail.com",
    role:  ROLE.ORGANIZER,
    password: hashPassword,
    gender: GENDER.MALE
},
  {
    userName: "pat", //2
    email: "pat@gmail.com",
    role:  ROLE.ORGANIZER,
    password: hashPassword,
    gender: GENDER.MALE
},
{
  userName: "japan", //3
  email: "japan@gmail.com",
  role:  ROLE.ORGANIZER,
  password: hashPassword,
  gender: GENDER.MALE
},
{
  userName: "guide", //4
  email: "guide@gmail.com",
  role:  ROLE.ORGANIZER,
  password: hashPassword,
  gender: GENDER.MALE
},
{
  userName: "bank", //5
  email: "bank@gmail.com",
  role:  ROLE.ORGANIZER,
  password: hashPassword,
  gender: GENDER.MALE
},
{
  userName: "pete", //6
  email: "pete@gmail.com",
  role:  ROLE.ORGANIZER,
  password: hashPassword,
  gender: GENDER.MALE
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




async function seeding() {
    await prisma.user.createMany({data: user})
    await prisma.organizerInformation.createMany({data: organizerInformation})

}


seeding()
