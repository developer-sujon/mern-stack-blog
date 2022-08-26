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
  let { title, description, categoryId, tagsId } = req.body;

  if (!title) {
    throw createError("Title Is Required", 400);
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(title, description);

  if (tagsId) {
    tagsId = tagsId.split(",");
  } else {
    tagsId = [];
  }

  const newPost = new PostModel({
    title,
    description: req?.body?.description,
    categoryId,
    tagsId,
    userId: req.id,
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

    res.status(201).json({ message: "Post Creat Successfull" });
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
          localField: "likes",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "disLikes",
          foreignField: "_id",
          as: "disLikes",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagsId",
          foreignField: "_id",
          as: "tags",
        },
      },
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
          title: 1,
          postThumbnail: 1,
          slug: 1,
          description: 1,
          likes: { userName: 1 },
          disLikes: { userName: 1 },
          tags: { name: 1, _id: 1 },
          category: { $first: "$category.name" },
          isLike: 1,
          isDisLike: 1,
          numView: 1,
          user: { userName: 1, avatar: 1 },
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
          localField: "likes",
          foreignField: "_id",
          as: "likes",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "disLikes",
          foreignField: "_id",
          as: "disLikes",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "tagsId",
          foreignField: "_id",
          as: "tags",
        },
      },
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
          title: 1,
          postThumbnail: 1,
          slug: 1,
          description: 1,
          likes: { userName: 1 },
          disLikes: { userName: 1 },
          tags: { name: 1, _id: 1 },
          category: { $first: "$category.name" },
          isLike: 1,
          isDisLike: 1,
          numView: 1,
          user: { userName: 1, avatar: 1, _id: 1 },
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
  let { title, description, tagsId, categoryId } = req.body;

  if (!title) {
    throw createError("Title Is Required", 400);
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(title, description);

  if (tagsId) {
    tagsId = tagsId.split(" ");
  } else {
    tagsId = [];
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
      userId: req.id,
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
  const loginUserId = req.id;
  try {
    let post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    const alreadylike = post[0]?.likes.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );
    const alreadyDislike = post[0]?.disLikes.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );

    if (alreadyDislike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { disLikes: loginUserId },
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
          $pull: { likes: loginUserId },
          isLike: false,
        },
        { new: true },
      );
      res.json(post);
    } else {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $push: { likes: loginUserId },
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
  const loginUserId = req.id;
  try {
    let post = await PostModel.aggregate([{ $match: { _id: ObjectId(id) } }]);

    if (!post.length > 0) {
      throw createError("Post Not Found", 404);
    }

    const alreadylike = post[0]?.likes.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );
    const alreadyDislike = post[0]?.disLikes.find(
      (userId) => userId.toString() === loginUserId.toString(),
    );

    if (alreadylike) {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $pull: { likes: loginUserId },
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
          $pull: { disLikes: loginUserId },
          isDisLike: false,
        },
        { new: true },
      );
      res.json(post);
    } else {
      post = await PostModel.findByIdAndUpdate(
        id,
        {
          $push: { disLikes: loginUserId },
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
