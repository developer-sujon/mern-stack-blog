//External import
const userRoutes = require("express").Router();

//Internal Import
const {
  selectProfile,
  selectUserProfile,
  updateUser,
  deleteUser,
  followingUser,
  unFollowingUser,
  verifyAccountSendOtp,
  verifyAccountVerifyOtp,
  recoveryAccountSendOtp,
  recoveryAccountVerifyOtp,
  recoveryPassword,
  uploadProfilePhoto,
} = require("../controller/userControllers");
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");
const { imageUpload } = require("../middleware/multer/uploadPhoto");

//Select User
userRoutes.get("/selectProfile", userAuth, selectProfile);

//Select User By User Name
userRoutes.get("/selectUserProfile/:userName", selectUserProfile);

//Update User
userRoutes.patch(
  "/updateUser",
  imageUpload.single("avata"),
  userAuth,
  updateUser,
);

//Delete User
userRoutes.delete("/deleteUser", userAuth, deleteUser);

//Upload Profile Photo
userRoutes.patch(
  "/uploadProfilePhoto",
  userAuth,
  imageUpload.single("avata"),
  uploadProfilePhoto,
);

//Following User
userRoutes.patch("/followingUser", userAuth, followingUser);

//UnFollowing User
userRoutes.patch("/unFollowingUser", userAuth, unFollowingUser);

// Verify Account Send Otp
userRoutes.get("/verifyAccountSendOtp", userAuth, verifyAccountSendOtp);

// Verify Account Verify Otp
userRoutes.get(
  "/verifyAccountVerifyOtp/:otpCode",
  userAuth,
  verifyAccountVerifyOtp,
);

// Recovery Account Send Otp
userRoutes.get("/recoveryAccountSendOtp/:email", recoveryAccountSendOtp);

// Recovery Account Verify Otp
userRoutes.get(
  "/recoveryAccountVerifyOtp/:email/:otpCode",
  recoveryAccountVerifyOtp,
);

// Recovery Password
userRoutes.get("/recoveryPassword/:email/:otpCode", recoveryPassword);

module.exports = userRoutes;
