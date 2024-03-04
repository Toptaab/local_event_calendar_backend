const utils = {
    jwt: require("./jwt"),
    bcrypt: require("./bcrypt"),
    catchError: require('./catchError'),
    uploadImage: require('./cloudinary')
}
module.exports = utils
