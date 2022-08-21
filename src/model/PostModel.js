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
    likes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    disLikes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      default: "630059266048e37265560aa0",
      required: true,
    },
    tagsId: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Tag",
        },
      ],
    },
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
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const PostModel = model("Post", postSchema);

module.exports = PostModel;
