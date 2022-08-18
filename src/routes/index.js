//External import
const routes = require("express").Router();

//Internal Import
const authRoutes = require("./authRoutes");
const userRoutes = require("./userRoutes");
const adminRoutes = require("./adminRoutes");
const postRoutes = require("./postRoutes");
const categoryRoutes = require("./categoryRoutes");
const tagRoutes = require("./tagRoutes");
const commentRoutes = require("./commentRoutes");
const { emailMessageRoutes } = require("./emailMessageRoutes");

//auth Routes
routes.use("/auth", authRoutes);

//user Routes
routes.use("/user", userRoutes);

//admin Routes
routes.use("/admin", adminRoutes);

//post Routes
routes.use("/post", postRoutes);

//category Routes
routes.use("/category", categoryRoutes);

//tag Routes
routes.use("/tag", tagRoutes);

//tag Routes
routes.use("/comment", commentRoutes);

//tag Routes
routes.use("/email", emailMessageRoutes);

module.exports = routes;
