//External import
const multer = require("multer");
const sharp = require("sharp");
const path = require("path");

//Internal import
const { createError } = require("../../helper/errorHandler");

//Storage
const multerStorage = multer.memoryStorage();

//Image File Filter
const avataFileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb({ message: "Unsupported File Type" }, false);
  }
};

//Image Upload
const imageUpload = multer({
  storage: multerStorage,
  limits: {
    fileSize: 1000000,
  },
  fileFilter: avataFileFilter,
});

const resizeAvata = async (req, res, next) => {
  if (!req.file) return next();

  const fileExt = path.extname(req.file.originalname);
  req.file.filename =
    req.file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "-" +
    Date.now() +
    fileExt;

  try {
    await sharp(req.file.buffer)
      .resize(250, 250)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(`public/uploads/images/avata/${req.file.filename}`));

    req.file.avataImg = `/uploads/images/avata/${req.file.filename}`;

    next();
  } catch (e) {
    createError(e.message, e.status);
  }
};

const resizePost = async (req, res, next) => {
  if (!req.file) return next();

  const fileExt = path.extname(req.file.originalname);
  req.file.filename =
    req.file.originalname
      .replace(fileExt, "")
      .toLowerCase()
      .split(" ")
      .join("-") +
    "-" +
    Date.now() +
    fileExt;

  try {
    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(path.join(`public/uploads/images/posts/${req.file.filename}`));

    req.file.postThumbnail = `/uploads/images/posts/${req.file.filename}`;

    next();
  } catch (e) {
    createError(e.message, e.status);
  }
};

module.exports = {
  imageUpload,
  resizeAvata,
  resizePost,
};
