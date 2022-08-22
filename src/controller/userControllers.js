//external import
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs").promises;

//internal import
const UserModel = require("../model/UserModel");
const OtpModel = require("../model/OtpModel");

const { createError } = require("../helper/errorHandler");
const generateToken = require("../helper/generateToken");
const sendMailUtility = require("../utils/sendMailUtility");
const genRand = require("../helper/randGen");

/**
 * @desc Select All User
 * @access public
 * @route /api/v1/user/selectUser
 * @methud GET
 */

const selectUser = async (req, res) => {
  const { userName } = req;
  try {
    const users = await UserModel.aggregate([
      { $match: { userName: userName } },
    ]);

    res.json(users);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select User By User Name
 * @access public
 * @route /api/v1/user/selectUser/:userName
 * @methud GET
 */

const selectUserProfile = async (req, res) => {
  const { userName } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { userName } }]);

    res.json(user);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Update User
 * @access private
 * @route /api/v1/user/:id
 * @methud PATCH
 */

const updateUser = async (req, res) => {
  const id = req.id;
  const { userName, password, avatar, ...others } = req.body;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.updateOne(
      { _id: ObjectId(id) },
      { ...others, avatar: req?.file?.avataImg },
      {
        new: true,
      },
    );

    if (req?.file?.avataImg) {
      await fs.unlink("public" + user[0].avatar);
    }

    res.json({ messge: "User Update Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Delete User
 * @access private
 * @route /api/v1/user/:id
 * @methud DELETE
 */

const deleteUser = async (req, res) => {
  const id = req.id;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.deleteOne(id);

    res.json({ messge: "User Delete Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Upload Profile Photo
 * @access private
 * @route /api/v1/user/uploadProfilePhoto
 * @methud PATCH
 */

const uploadProfilePhoto = async (req, res) => {
  const { userName, id } = req;

  try {
    const user = await UserModel.aggregate([{ $match: { userName } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(id, {
      avatar: req?.file?.avataImg,
    });

    res.json({ message: "Avata Upload Sucessfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Following User
 * @access private
 * @route /api/v1/user/followingUser
 * @methud PATCH
 */

const followingUser = async (req, res) => {
  const userId = req.id;
  const followingId = req.body.followingId;

  try {
    const axitfollowingId = await UserModel.aggregate([
      { $match: { _id: ObjectId(followingId) } },
    ]);

    if (!axitfollowingId.length > 0) {
      throw createError("Following User Not Found", 404);
    }

    const allreadyFollow = await UserModel.aggregate([
      { $match: { following: ObjectId(followingId) } },
    ]);

    if (allreadyFollow.length > 0) {
      throw createError("Allready Following This User", 400);
    }

    await UserModel.findByIdAndUpdate(userId, {
      $push: {
        following: followingId,
      },
    });

    await UserModel.findByIdAndUpdate(followingId, {
      $push: {
        followes: userId,
      },
    });

    res.json({
      message: "You Have Successfull Following This User",
    });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Un Following User
 * @access private
 * @route /api/v1/user/UnFollowing
 * @methud PATCH
 */

const unFollowingUser = async (req, res) => {
  const userId = req.id;
  const unFollowingId = req.body.unFollowingId;

  try {
    const allreadyFollow = await UserModel.aggregate([
      { $match: { following: { $in: [ObjectId(unFollowingId)] } } },
    ]);

    if (!allreadyFollow.length > 0) {
      throw createError("Un Following User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(userId, {
      $pull: {
        following: unFollowingId,
      },
    });

    await UserModel.findByIdAndUpdate(unFollowingId, {
      $pull: {
        followes: userId,
      },
    });

    res.json({
      message: "You Have Successfull Un Following This User",
    });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Verify Account Send Otp
 * @access private
 * @route /api/v1/user/verifyAccountSendOtp
 * @methud PATCH
 */

const verifyAccountSendOtp = async (req, res) => {
  const { email } = req;

  try {
    const user = await UserModel.aggregate([{ $match: { email: email } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    const token = await generateToken({ email });

    const emailBody = `<div>${user[0].name},
    We're happy you signed up for ${process.env.APPLICATION_NAME} To start exploring the Ring App and neighborhood, please confirm your email address. <a href="${process.env.CLIENT_URL}/user/userAccountVerifyOtp/${token}">Verify Now</a> </div>`;

    const emailSubject = `Your ${process.env.APPLICATION_NAME} Accout Verification Link`;

    await sendMailUtility(email, emailBody, emailSubject);

    const newOtpCode = new OtpModel({
      otpCode: token,
      email: email,
    });

    await newOtpCode.save();

    res.json({ messge: "Otp Send Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Verify Account Verify Otp
 * @access private
 * @route /api/v1/user/verifyAccountVerifyOtp/:otpCode
 * @methud PATCH
 */

const verifyAccountVerifyOtp = async (req, res) => {
  const { email } = req;
  const { otpCode } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { email: email } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    const checkAlreadyVerify = await UserModel.aggregate([
      {
        $match: {
          $and: [{ email: email }, { accountStatus: { $in: ["ACTIVE"] } }],
        },
      },
    ]);

    if (checkAlreadyVerify.length > 0) {
      throw createError("You're Already Account Verify", 400);
    }

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    const countOtp = await OtpModel.aggregate([
      {
        $match: {
          otpCode,
          email,
          otpStatus: 0,
        },
      },
    ]);

    if (!countOtp.length > 0) {
      throw createError("Invalid Otp Code", 400);
    }

    const otpCodeExpire = await OtpModel.aggregate([
      {
        $match: {
          otpCodeExpire: { $gt: Date.now() },
        },
      },
    ]);

    if (!otpCodeExpire.length > 0) {
      throw createError("Expire Otp Code", 400);
    }

    await UserModel.updateOne(
      { email },
      {
        accountStatus: "ACTIVE",
      },
      { new: true },
    );

    res.json({ messge: "Account Verify Successful" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Recovery Account Send Otp
 * @access public
 * @route /api/v1/user/recoveryAccountSendOtp/:email
 * @methud GET
 */

const recoveryAccountSendOtp = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { email: email } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    const otpCode = genRand(6);

    const emailBody = `<p>${user[0].name},
    Your ${process.env.APPLICATION_NAME} Account Recovery Code Is <b>${otpCode}</b> </p>`;

    const emailSubject = `Your ${process.env.APPLICATION_NAME} Accout Recovery Code`;

    await sendMailUtility(email, emailBody, emailSubject);

    const newOtpCode = new OtpModel({
      otpCode,
      email,
    });

    await newOtpCode.save();

    res.json({ messge: "Otp Send Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Recovery Account Verify Otp
 * @access public
 * @route /api/v1/user/recoveryAccountVerifyOtp/:/email/:otpCode
 * @methud GET
 */

const recoveryAccountVerifyOtp = async (req, res) => {
  const { email } = req.params;
  const { otpCode } = req.params;

  try {
    const countOtp = await OtpModel.aggregate([
      { $match: { $and: [{ email }, { otpCode }] } },
    ]);

    if (!countOtp.length > 0) {
      throw createError("Invalid Otp Code", 400);
    }

    const useOtpCode = await OtpModel.aggregate([
      { $match: { $and: [{ email }, { otpCode }, { otpStatus: 0 }] } },
    ]);

    if (!useOtpCode.length > 0) {
      throw createError("Otp Code Allready Use", 400);
    }

    const otpCodeExpire = await OtpModel.aggregate([
      {
        $match: {
          otpCodeExpire: { $gt: Date.now() },
        },
      },
    ]);

    if (!otpCodeExpire.length > 0) {
      throw createError("Expire Otp Code", 400);
    }

    await OtpModel.updateOne(
      { otpCode },
      {
        otpStatus: 1,
      },
      { new: true },
    );

    res.json({ messge: "Otp Verify Successful" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Recovery Password
 * @access public
 * @route /api/v1/user/recoveryPassword/:/email/:otpCode
 * @methud PATCH
 */

const recoveryPassword = async (req, res) => {
  const { email } = req.params;
  const { otpCode } = req.params;
  let { password } = req.body;

  try {
    const countOtp = await OtpModel.aggregate([
      { $match: { $and: [{ email }, { otpCode }, { otpStatus: 1 }] } },
    ]);

    if (!countOtp.length > 0) {
      throw createError("Invalid Otp Code", 400);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    await UserModel.updateOne(
      { email },
      {
        password,
      },
      { new: true },
    );

    res.json({ messge: "Password Chenge Successful" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  selectUser,
  selectUserProfile,
  updateUser,
  deleteUser,
  uploadProfilePhoto,
  followingUser,
  unFollowingUser,
  verifyAccountSendOtp,
  verifyAccountVerifyOtp,
  recoveryAccountSendOtp,
  recoveryAccountVerifyOtp,
  recoveryPassword,
};
