const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage(); // We'll use buffer with Cloudinary
const uploadImages = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      return cb(new Error("Only images are allowed"));
    }
    cb(null, true);
  },
});

module.exports = uploadImages;