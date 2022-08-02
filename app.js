//External Lib  import
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const multer = require("multer");
const path = require("path");
require("express-async-errors");
const app = new express();

//Internal Import
const {
  defaultErrorHandler,
  notFoundError,
} = require("./src/helper/errorHandler");

//Confiqure dotenv
dotenv.config({ path: path.join(__dirname, "./.env") });

//Import Database Confiq
const connectDB = require("./src/confiq/db");

//Import route
const routes = require("./src/routes");

//Security lib import
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const expressMongoSanitize = require("express-mongo-sanitize");
const xssClean = require("xss-clean");

//Security middleware emplement
app.use(cors());
app.use(hpp());
app.use(helmet());
app.use(expressMongoSanitize());
app.use(xssClean());

//Default middleware emplement
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Apply the rate limiting middleware to all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10000,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

const MONGODB_CONNECTION_URL = process.env.MONGODB_CONNECTION_URL;
const DB_OPTIONS = {
  user: process.env.MONGODB_DATABASE_USERNAME,
  pass: process.env.MONGODB_DATABASE_PASSWORD,
  dbName: "mern-blog",
  autoIndex: true,
};

//connection database
connectDB(MONGODB_CONNECTION_URL, DB_OPTIONS);

//static file
app.use(express.static("client/build"));

//multer fiile upload middleware
const upload = multer({ dest: "uploads/" }).single("demo_image");

app.post("/api/v1/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Something went wrong!");
    }
    res.send(req.file);
  });
});

// Routing Implement
app.use("/api/v1", routes);
app.use("/images", express.static(path.join(__dirname, "/uploads")));

// Add React Front End Routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "uploads"));
});

//Not Found Error Handler
app.use(notFoundError);

// Default Error Handler
app.use(defaultErrorHandler);

module.exports = app;
