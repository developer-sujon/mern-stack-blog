//External Import
const ObjectId = require("mongoose").Types.ObjectId;

//Internal Import
const { createError } = require("../helper/errorHandler");
const CommentModel = require("../model/CommentModel");

/**
 * @desc Create Comment
 * @access private
 * @route /api/v1/comment/createComment
 * @methud POST
 */

const createComment = async (req, res) => {
  let { description, postId } = req.body;
  let userId = req.id;

  if (!description) {
    throw createError("Comment Description Is Required", 400);
  }

  const newComment = new CommentModel({
    postId,
    description,
    userId,
  });

  try {
    const comment = await newComment.save();

    res.status(201).json(comment);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select All Comment
 * @access private
 * @route /api/v1/comment/selectAllComment
 * @methud GET
 */

const selectAllComment = async (req, res) => {
  try {
    const comments = await CommentModel.aggregate([
      {
        $project: {
          description: 1,
          postId: 1,
        },
      },
    ]);

    res.json(comments);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select Comment
 * @access private
 * @route /api/v1/comment/selectComment/:id
 * @methud GET
 */

const selectComment = async (req, res) => {
  const { id } = req.params;
  try {
    let comment = await CommentModel.aggregate([
      { $match: { _id: ObjectId(id) } },
      {
        $project: {
          description: 1,
          postId: 1,
        },
      },
    ]);

    res.json(comment);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Update Comment
 * @access private
 * @route /api/v1/comment/updateComment/:id
 * @methud PATCH
 */

const updateComment = async (req, res) => {
  const { id } = req.params;
  let { description, postId } = req.body;
  let userId = req.id;

  try {
    const comment = await CommentModel.aggregate([
      { $match: { _id: ObjectId(id), postId: postId } },
    ]);

    if (!comment.length > 0) {
      throw createError("Comment Not Found", 404);
    }

    return false;

    await CommentModel.findByIdAndUpdate(id, {
      description,
      userId,
    });

    res.json({ message: "Comment Update Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Detele Comment
 * @access private
 * @route /api/v1/comment/deleteComment/:id
 * @methud DELETE
 */

const deleteComment = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.aggregate([
      { $match: { _id: ObjectId(id) } },
    ]);

    if (!comment.length > 0) {
      throw createError("Comment Not Found", 404);
    }

    await CommentModel.findByIdAndDelete(id);

    res.json({ message: "Comment Delete Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select Comment By Post
 * @access private
 * @route /api/v1/comment/selectCommentByPost/:postId
 * @methud GET
 */

const selectCommentByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    let comment = await CommentModel.aggregate([
      { $match: { postId: ObjectId(postId) } },
      {
        $project: {
          description: 1,
          postId: 1,
        },
      },
    ]);

    res.json(comment);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  createComment,
  selectAllComment,
  selectComment,
  updateComment,
  deleteComment,
  selectCommentByPost,
};
