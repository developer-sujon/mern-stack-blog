//External Import
const ObjectId = require("mongoose").Types.ObjectId;

//Internal Import
const { createError } = require("../helper/errorHandler");
const CategoryModel = require("../model/CategoryMode");

/**
 * @desc Create Category
 * @access private
 * @route /api/v1/category/createCategory
 * @methud POST
 */

const createCategory = async (req, res) => {
  let { name } = req.body;
  let userId = req.id;

  if (!name) {
    throw createError("Category Name Is Required", 400);
  }

  const newCategory = new CategoryModel({
    name,
    userId,
  });

  const existCategory = await CategoryModel.aggregate([{ $match: { name } }]);

  if (existCategory.length > 0) {
    throw createError("Category Name Already Exist", 400);
  }

  try {
    const category = await newCategory.save();

    res.status(201).json({ message: "Category Create Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select All Category
 * @access private
 * @route /api/v1/category/selectAllCategory
 * @methud GET
 */

const selectAllCategory = async (req, res) => {
  try {
    const categories = await CategoryModel.aggregate([
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $project: {
          name: 1,
          user: { userName: 1, avatar: 1, email: 1 },
          createdAt: 1,
        },
      },
    ]);

    res.json(categories);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select Category
 * @access private
 * @route /api/v1/category/selectCategory/:id
 * @methud GET
 */

const selectCategory = async (req, res) => {
  const { id } = req.params;
  try {
    let category = await CategoryModel.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $project: {
          name: 1,
        },
      },
    ]);

    res.json(category);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Update Category
 * @access private
 * @route /api/v1/category/updateCategory/:id
 * @methud PATCH
 */

const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { userId } = req;
  try {
    const category = await CategoryModel.aggregate([
      { $match: { _id: ObjectId(id) } },
    ]);

    if (!category.length > 0) {
      throw createError("Category Not Found", 404);
    }

    const existCategory = await CategoryModel.aggregate([{ $match: { name } }]);

    if (existCategory.length > 0) {
      throw createError("Category Name Already Exist", 400);
    }

    await CategoryModel.findByIdAndUpdate(id, {
      name: name.toLowerCase(),
      userId,
    });

    res.json({ message: "Category Update Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Detele Category
 * @access private
 * @route /api/v1/category/deleteCategory/:id
 * @methud DELETE
 */

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await CategoryModel.aggregate([
      { $match: { _id: ObjectId(id) } },
    ]);

    if (!category.length > 0) {
      throw createError("Category Not Found", 404);
    }

    await CategoryModel.findByIdAndDelete(id);

    res.json({ message: "Category Delete Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  createCategory,
  selectAllCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
};
