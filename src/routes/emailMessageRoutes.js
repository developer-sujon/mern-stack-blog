//External import
const emailMessageRoutes = require("express").Router();

//Internal Import
const { userAuth } = require("../middleware/checkAuthLogin");
const { sendEmailMessage } = require("../controller/emailMessageControllers");

//Send Email Message
emailMessageRoutes.post("/sendEmailMessage", userAuth, sendEmailMessage);

module.exports = {
  emailMessageRoutes,
};
