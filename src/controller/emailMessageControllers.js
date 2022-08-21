//External Import
const ObjectId = require("mongoose").Types.ObjectId;
const Filter = require("bad-words");

//Internal Import
const { createError } = require("../helper/errorHandler");
const sendMailUtility = require("../utils/sendMailUtility");
const EmailMessageModel = require("../model/EmailMessage");

/**
 * @desc Send Email Message
 * @access private
 * @route /api/v1/email/sendEmailMessage
 * @methud POST
 */

const sendEmailMessage = async (req, res) => {
  let { to, message, subject } = req.body;
  let { id, email } = req;

  if (!to || !message || !subject) {
    throw createError("All Feilds Is Required", 400);
  }

  const filter = new Filter();
  const isProfane = filter.isProfane(message, subject);

  if (isProfane) {
    throw createError(
      "Creating Failure Because it Contains Profane Words",
      400,
    );
  }

  const newEmailMessage = new EmailMessageModel({
    form: email,
    to,
    message,
    subject,
    userId: id,
  });

  try {
    await newEmailMessage.save();
    await sendMailUtility(to, message, subject);

    res.status(201).json({
      message: "Email Sent Successfull",
    });
  } catch (e) {
    throw createError(e.message, e.status);
  }
};

module.exports = {
  sendEmailMessage,
};
