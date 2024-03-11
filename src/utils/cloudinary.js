const cloudinary = require("../config/cloudinary")

module.exports.uploadImage = async (imagePath, path) => {
    const options = {
        use_filename: true,
    }
    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, {
            folder: path,
            use_filename: true
        })
        console.log(result)
        return result
    } catch (error) {
        console.error(error)
    }
}

module.exports.deleteImage = async (publicId) => {
    try {
        const temp = publicId
        const result = await cloudinary.uploader.destroy(temp)

        console.log(result)
    } catch (error) {
        console.log(error)
    }
}



