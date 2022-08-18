//external import
const { model, Schema } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    categoryId: {
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

const CategoryModel = model("Category", categorySchema);

module.exports = CategoryModel;
