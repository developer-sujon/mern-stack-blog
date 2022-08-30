//External import
const { model, Schema } = require("mongoose");

const tagSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const TagModel = model("Tag", tagSchema);

module.exports = TagModel;
