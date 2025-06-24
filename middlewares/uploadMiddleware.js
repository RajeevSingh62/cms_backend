require('dotenv').config();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary=require('../utils/cloudinary')
   console.log('Cloudinary config:', process.env.CLOUDINARY_CLOUD_NAME, process.env.CLOUDINARY_API_KEY, process.env.CLOUDINARY_API_SECRET);
const storage = new CloudinaryStorage({
  
  cloudinary,
  params: {
    folder: 'cms-posts',
    allowed_formats: ['jpg', 'jpeg', 'png','avif'],
  },
});

const upload = multer({ storage });

module.exports = upload;
