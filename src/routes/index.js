//External import
const routes = require("express").Router();

//Internal Import
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");

//auth Routes
routes.use("/auth", authRoutes);

//user Routes
routes.use("/user", userRoutes);

module.exports = routes;
