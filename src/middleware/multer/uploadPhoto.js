//External import
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//Internal import
const { CreateError } = require("../../helper/errorHandler");

//Storage
// File upload folder
const UPLOADS_FOLDER = "./public/images/";

// var upload = multer({ dest: UPLOADS_FOLDER });

// define the storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_FOLDER);
  },
  filename: (req, file, cb) => {
    const fileExt = path.extname(file.originalname);
    const fileName =
      file.originalname
        .replace(fileExt, "")
        .toLowerCase()
        .split(" ")
        .join("-") +
      "-" +
      Date.now();

    cb(null, fileName + fileExt);
  },
});

//Image File Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Type" }, false);
  }
};

//Image Upload
const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: multerFilter,
});

const resizeImg = async (req, res, next) => {
  // if (!req.file) return next();

  // const fileExt = path.extname(req.file.originalname);
  // const formetFileName =
  //   req.file.originalname
  //     .replace(fileExt, "")
  //     .toLowerCase()
  //     .split(" ")
  //     .join("-") +
  //   "-" +
  //   Date.now() +
  //   fileExt;

  // console.log(formetFileName);

  // try {
  //   req.file.filename = req.file.originalname;
  //   next();
  // } catch (e) {
  //   CreateError(e.message, e.status);
  // }

  return next();
};

module.exports = {
  resizeImg,
  imageUpload,
};
