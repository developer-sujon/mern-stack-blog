//External Import
const ObjectId = require("mongoose").Types.ObjectId;
const fs = require("fs").promises;
const Filter = require("bad-words");

//Internal Import
const { createError } = require("../helper/errorHandler");
const PostModel = require("../model/PostModel");
const UserModel = require("../model/UserModel");

/**
 * @desc Create Post
 * @access private
 * @route /api/v1/post/createPost
 * @methud POST
 */

const createPost = async (req, res) => {
  let { title, description, categoryId, tagId } = req.body;

  if (!title) {
    throw createError("Title Is Required", 400);
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(title, description);

  if (tagId) {
    tagId = tagId.split(" ");
  } else {
    tagId = [];
  }

  const newPost = new PostModel({
    title,
    description: req?.body?.description,
    categoryId,
    tagId,
    user: req.userName,
    postThumbnail: req?.file?.postThumbnail,
    slug: req.body.title.toLowerCase().split(" ").join("-"),
  });

  try {
    if (isProfane) {
      await UserModel.findByIdAndUpdate(req.id, {
        accountStatus: "REJECTED",
      });
      throw createError(
        "Creating Failure Because it Contains Profane Words",
        400,
      );
    }

    const post = await newPost.save();

    res.status(201).json(post);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select All Post
 * @access private
 * @route /api/v1/post/selectAllPost
 * @methud GET
 */

const selectAllPost = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "userName",
          as: "user",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "categories",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagId",
          foreignField: "tagId",
          as: "tags",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "likeId",
          foreignField: "_id",
          as: "likes",
        },
      },
    ]);

    if (!posts.length > 0) {
      throw createError("Posts Not Found", 404);
    }

    res.json(posts);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Select Post By Slug
 * @access private
 * @route /api/v1/post/selectPostBySlug/:slug
 * @methud GET
 */

const selectPostBySlug = async (req, res) => {
  const { slug } = req.params;
  try {
    let post = await PostModel.aggregate([{ $match: { slug } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    await PostModel.updateOne(
      { slug },
      { $inc: { numView: 1 } },
      { new: true },
    );

    post = await PostModel.aggregate([
      {
        $match: {
          slug,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "likeId",
          foreignField: "userId",
          as: "likeId",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "disLikeId",
          foreignField: "userId",
          as: "disLikeId",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagId",
          foreignField: "tagId",
          as: "tagId",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "categoryId",
          as: "categoryId",
        },
      },
    ]);

    res.json(post);
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Update Post
 * @access private
 * @route /api/v1/post/updatePost/:id
 * @methud PATCH
 */

const updatePost = async (req, res) => {
  const { id } = req.params;
  let { title, description, tagId } = req.body;

  if (!title) {
    throw createError("Title Is Required", 400);
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(title, description);

  if (tagId) {
    tagId = tagId.split(" ");
  } else {
    tagId = [];
  }

  try {
    const post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    if (isProfane) {
      await UserModel.findByIdAndUpdate(req.id, {
        accountStatus: "REJECTED",
      });
      throw createError(
        "Creating Failure Because it Contains Profane Words",
        400,
      );
    }

    if (req?.file?.postThumbnail) {
      await fs.unlink("public" + post[0].postThumbnail);
    }

    await PostModel.findByIdAndUpdate(id, {
      ...req.body,
      user: req.userName,
      postThumbnail: req?.file?.postThumbnail,
      slug: req.body.title.toLowerCase().split(" ").join("-"),
    });

    res.json({ message: "Post Update Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Delete Post
 * @access private
 * @route /api/v1/post/deletePost/:id
 * @methud DELETE
 */

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    await fs.unlink("public" + post[0].postThumbnail);
    await PostModel.findOneAndDelete(id);

    res.json({ message: "Post Delete Successfull" });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc Like Post
 * @access private
 * @route /api/v1/post/likePost/:id
 * @methud PUT
 */

const likePost = async (req, res) => {
  const { id } = req.params;
  const loginUserId = req.userId;
  try {
    let post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    const alreadylike = post[0]?.likeId.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );
    const alreadyDislike = post[0]?.disLikeId.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );

    if (alreadyDislike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { disLikeId: loginUserId },
          isDisLike: false,
        },
        { new: true },
      );

      res.json(post);
    }

    if (alreadylike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { likeId: loginUserId },
          isLike: false,
        },
        { new: true },
      );
      res.json(post);
    } else {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $push: { likeId: loginUserId },
          isLike: true,
        },
        { new: true },
      );
      res.json(post);
    }
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

/**
 * @desc DisLike Post
 * @access private
 * @route /api/v1/post/disLikePost/:id
 * @methud PUT
 */

const disLikePost = async (req, res) => {
  const { id } = req.params;
  const loginUserId = req.userId;
  try {
    let post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    const alreadylike = post[0]?.likeId.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );
    const alreadyDislike = post[0]?.disLikeId.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );

    if (alreadylike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { likeId: loginUserId },
          isLike: false,
        },
        { new: true },
      );

      res.json(post);
    }

    if (alreadyDislike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { disLikeId: loginUserId },
          isDisLike: false,
        },
        { new: true },
      );
      res.json(post);
    } else {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $push: { disLikeId: loginUserId },
          isDisLike: true,
        },
        { new: true },
      );
      res.json(post);
    }
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  createPost,
  selectAllPost,
  selectPostBySlug,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
};
