const cloudinary = require('cloudinary').v2;

require('dotenv').config()

const CLOUDINARY_NAME = process.env.CLOUD_NAME
const CLOUDINARY_API_KEY = process.env.CLOUD_API_KEY
const CLOUDINARY_API_SECRET = process.env.CLOUD_API_SECRET


cloudinary.config({
    cloud_name:CLOUDINARY_NAME,
    api_key:CLOUDINARY_API_KEY,
    api_secret:CLOUDINARY_API_SECRET,
  });

  module.exports = cloudinary