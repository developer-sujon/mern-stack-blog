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

const selectUser = async (req, res) => {
  const { userName } = req;

  try {
    const user = await UserModel.aggregate([
      { $match: { userName } },
      { $project: { password: 0 } },
    ]);

    if (!user.length > 0) {
      throw createError("User Not Found", 404);
    }

    res.json(user);
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

const selectUserByUserName = async (req, res) => {
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

module.exports = {
  selectUser,
  selectUserByUserName,
  updateUser,
  deleteUser,
};
