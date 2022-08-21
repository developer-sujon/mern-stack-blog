//external import
const { model, Schema } = require("mongoose");

const emailMessageSchema = new Schema(
  {
    form: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    isRead: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const EmailMessageModel = model("EmailMessage", emailMessageSchema);

module.exports = EmailMessageModel;
