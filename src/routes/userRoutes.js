//External Import
const userRoutes = require("express").Router();

//Internal Import
const {
  selectUser,
  selectUserByUserName,
  updateUser,
  deleteUser,
} = require("../controller/userControllers");
const checkLogin = require("../middleware/checkLogin");

//Select User
userRoutes.get("/selectUser", checkLogin, selectUser);

//Select User By User Name
userRoutes.get("/selectUser/:userName", selectUserByUserName);

//Update User
userRoutes.patch("/updateUser", checkLogin, updateUser);

//Delete User
userRoutes.delete("/deleteUser", checkLogin, deleteUser);

module.exports = userRoutes;
