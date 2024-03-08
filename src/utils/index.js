const utils = {
    jwt: require("./jwt"),
    bcrypt: require("./bcrypt"),
    catchError: require('./catchError'),
    cloudinary: require('./cloudinary'),
    getPubblicId: require('./getCloudinaryPublicId')
}
module.exports = utils
