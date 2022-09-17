//External import
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
      required: true,
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
    public_id: {
      type: String,
      required: true,
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
