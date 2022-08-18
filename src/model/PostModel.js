//external import
const { model, Schema } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    postId: {
      type: String,
      default: function () {
        return Math.round(Date.now() / 1000);
      },
      required: true,
    },
    postThumbnail: {
      type: String,
      default: "/uploads/images/posts/post.jpg",
    },
    slug: {
      type: String,
      unique: true,
      trim: true,
    },
    description: String,
    likeId: [String],
    disLikeId: [String],
    commentId: [String],
    categoryId: {
      type: String,
      default: "1660846768",
      required: true,
    },
    tagId: [String],
    isLike: {
      type: Boolean,
      default: false,
    },
    isDisLike: {
      type: Boolean,
      default: false,
    },
    numView: {
      type: Number,
      default: 0,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const PostModel = model("Post", postSchema);

module.exports = PostModel;
