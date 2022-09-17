//External import
const mongoose = require("mongoose");
const { createError } = require("../helper/errorHandler");
const ObjectId = require("mongoose").Types.ObjectId;

//internal import
const UserModel = require("../model/UserModel");

/**
 * @desc Select All User
 * @access public
 * @route /api/v1/user/selectAllUser
 * @methud GET
 */

const selectAllUser = async (req, res) => {
  try {
    const user = await UserModel.aggregate([{ $match: { roles: "USER" } }]);

    res.json(user);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Block User
 * @access private
 * @route /api/v1/admin/blockUser
 * @methud PUT
 */

const blockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(id, {
      accountStatus: "REJECTED",
    });

    res.json({ message: "This User Block Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Unblock User
 * @access private
 * @route /api/v1/admin/unBlockUser
 * @methud PUT
 */

const unBlockUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await UserModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    await UserModel.findByIdAndUpdate(id, {
      accountStatus: "ACTIVE",
    });

    res.json({ message: "This User Unblock Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = { selectAllUser, blockUser, unBlockUser };
