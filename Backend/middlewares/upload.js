const multer = require("multer");
const path = require("path");

// File Filter - Only Images Allowed
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extName = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (extName) {
    return cb(null, true);
  } else {
    return cb(new Error("Only images (JPEG, JPG, PNG) are allowed!"));
  }
};

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

module.exports = multer({ storage, fileFilter });
