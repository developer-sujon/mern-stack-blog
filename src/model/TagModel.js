//external import
const { model, Schema } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    tagId: {
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

const TagModel = model("Tag", tagSchema);

module.exports = TagModel;
