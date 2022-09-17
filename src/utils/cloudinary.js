//External import
const cloudinary = require("cloudinary");
const { CreateError } = require("../helper/errorHandler");

//confiqure cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

const cloudinaryUpload = async (fileToUpload) => {
  try {
    const data = await cloudinary.uploader.upload(fileToUpload, {
      resource_type: "auto",
    });

    return {
      url: data?.secure_url,
      public_id: data?.public_id,
    };
  } catch (e) {
    CreateError(e.message, e.status);
  }
};

const cloudinaryDelete = async (public_id) => {
  try {
    return await cloudinary.uploader.destroy(public_id);
  } catch (e) {
    CreateError(e.message, e.status);
  }
};

module.exports = { cloudinaryUpload, cloudinaryDelete };
