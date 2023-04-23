// const cloudinary = require('cloudinary').v2;
import cloudinary from 'cloudinary'
// const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'Amplifier',
//     allowedFormats: ['jpeg', 'png', 'jpg', 'webp', 'mp3', 'avi', 'mp4'],
//   },
// });

// export {
//   cloudinary,
//   storage,
// };

export default cloudinary;
