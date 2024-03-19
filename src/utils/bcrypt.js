const bcrypt = require("bcryptjs")

module.exports.hashed = async (password) => await bcrypt.hash(password, +process.env.BCRYPT_SALT ?? 10)
module.exports.compare = async (input, password) => await bcrypt.compare(input, password)
module.exports.hashedsync =  (password) =>  bcrypt.hashSync(password, +process.env.BCRYPT_SALT ?? 10)