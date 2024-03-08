const cloudinary = require("../config/cloudinary")

const uploadImage = async (imagePath, path) => {
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

module.exports = uploadImage
