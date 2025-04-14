// utils/cloudinary.js
const cloudinary = require("../config/cloudinaryConfig");

const uploadToCloudinary = (buffer, folder) => {
  console.log("Uploading to Cloudinary...", folder);

  return new Promise((resolve, reject) => {
    try {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) {
            console.error("❌ Cloudinary upload error:", error);
            return reject({
              message: "Failed to upload image to Cloudinary",
              error,
            });
          }

          console.log("✅ Uploaded to Cloudinary:", result.secure_url);
          resolve(result);
        }
      );

      stream.end(buffer);
    } catch (err) {
      console.error("❌ Unexpected error during Cloudinary upload:", err);
      reject({
        message: "Unexpected error during Cloudinary upload",
        error: err,
      });
    }
  });
};

module.exports = uploadToCloudinary;
