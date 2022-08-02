//External Import
const authRoutes = require("express").Router();

//Internal Import
const {
  registrationUser,
  loginUser,
} = require("../controller/authControllers");

//Register User
authRoutes.post("/registrationUser", registrationUser);

//Login User
authRoutes.post("/loginUser", loginUser);

module.exports = authRoutes;
