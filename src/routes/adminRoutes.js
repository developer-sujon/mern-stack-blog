//External import
const adminRoutes = require("express").Router();

//Internal Import
const {
  blockUser,
  unBlockUser,
  selectAllUser,
} = require("../controller/adminControllers");
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");

//Select All User
adminRoutes.get("/selectAllUser", userAuth, adminAuth, selectAllUser);

//Block User
adminRoutes.put("/blockUser/:id", userAuth, adminAuth, blockUser);

//Unblock User
adminRoutes.put("/unBlockUser/:id", userAuth, adminAuth, unBlockUser);

module.exports = adminRoutes;
