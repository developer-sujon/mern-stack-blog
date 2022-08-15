//External Import
const userRoutes = require("express").Router();

//Internal Import
const {
  selectUsers,
  selectUserProfile,
  updateUser,
  deleteUser,
  followingUser,
  unFollowingUser,
} = require("../controller/userControllers");
const checkLogin = require("../middleware/checkLogin");

//Select User
userRoutes.get("/selectUser", selectUsers);

//Select User By User Name
userRoutes.get("/selectUserProfile/:userName", selectUserProfile);

//Update User
userRoutes.patch("/updateUser", checkLogin, updateUser);

//Delete User
userRoutes.delete("/deleteUser", checkLogin, deleteUser);

//Following User
userRoutes.patch("/followingUser", checkLogin, followingUser);

//UnFollowing User
userRoutes.patch("/unFollowingUser", checkLogin, unFollowingUser);

module.exports = userRoutes;
