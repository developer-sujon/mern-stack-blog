//external import
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const jwt = require("jsonwebtoken");

//internal import
const UserModel = require("../model/UserModel");
const { createError } = require("../helper/errorHandler");

/**
 * @desc Select User
 * @access public
 * @route /api/v1/user/selectUser
 * @methud GET
 */

const selectUsers = async (req, res) => {
  try {
    const users = await UserModel.aggregate([{ $project: { password: 0 } }]);

    if (!users.length > 0) {
      throw createError("User Not Found", 404);
    }

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

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

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
  const { userName, password, email, phone, ...others } = req.body;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.updateOne({ _id: ObjectId(id) }, others, {
      new: true,
    });

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

module.exports = {
  selectUsers,
  selectUserProfile,
  updateUser,
  deleteUser,
  followingUser,
  unFollowingUser,
};
