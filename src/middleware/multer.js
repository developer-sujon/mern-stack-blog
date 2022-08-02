const multer = require("multer");
const path = require("path");

// File upload folder
// const UPLOADS_FOLDER = "../uploads/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
