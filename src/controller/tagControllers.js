//External Import
const ObjectId = require("mongoose").Types.ObjectId;

//Internal Import
const { createError } = require("../helper/errorHandler");
const TagModel = require("../model/TagModel");

/**
 * @desc Create Tag
 * @access private
 * @route /api/v1/tag/createTag
 * @methud POST
 */

const createTag = async (req, res) => {
  let { name } = req.body;
  let userId = req.id;

  if (!name) {
    throw createError("Tag Name Is Required", 400);
  }

  const newTag = new TagModel({
    name: name.toLowerCase(),
    userId,
  });

  try {
    const tag = await newTag.save();

    res.status(201).json(tag);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select All Tag
 * @access private
 * @route /api/v1/tag/selectAllTag
 * @methud GET
 */

const selectAllTag = async (req, res) => {
  try {
    const tags = await TagModel.aggregate([
      {
        $project: {
          name: 1,
        },
      },
    ]);

    res.json(tags);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select Tag
 * @access private
 * @route /api/v1/tag/selectTag/:id
 * @methud GET
 */

const selectTag = async (req, res) => {
  const { id } = req.params;
  try {
    let tag = await TagModel.aggregate([
      {
        $match: { _id: ObjectId(id) },
      },
      {
        $project: {
          name: 1,
        },
      },
    ]);

    res.json(tag);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Update Tag
 * @access private
 * @route /api/v1/tag/updateTag/:id
 * @methud PATCH
 */

const updateTag = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  let userId = req.id;

  try {
    const tag = await TagModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!tag.length > 0) {
      throw createError("Tag Not Found", 404);
    }

    await TagModel.findByIdAndUpdate(id, {
      name: name.toLowerCase(),
      userId,
    });

    res.json({ message: "Tag Update Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Detele Tag
 * @access private
 * @route /api/v1/tag/deleteTag/:id
 * @methud DELETE
 */

const deleteTag = async (req, res) => {
  const { id } = req.params;
  try {
    const tag = await TagModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!tag.length > 0) {
      throw createError("Tag Not Found", 404);
    }

    await TagModel.findByIdAndDelete(id);

    res.json({ message: "Tag Delete Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  createTag,
  selectAllTag,
  selectTag,
  updateTag,
  deleteTag,
};
