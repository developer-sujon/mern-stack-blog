//external import
const { model, Schema } = require("mongoose");

const commentSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    commentId: {
      type: String,
      default: function () {
        return Math.round(Date.now() / 1000);
      },
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const CommentModel = model("Comment", commentSchema);

module.exports = CommentModel;
