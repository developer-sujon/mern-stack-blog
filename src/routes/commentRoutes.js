//External Import
const commentRoutes = require("express").Router();

//Internal Import
const { userAuth } = require("../middleware/checkAuthLogin");
const {
  createComment,
  selectAllComment,
  selectComment,
  updateComment,
  deleteComment,
} = require("../controller/commentControllers");

//Create Comment
commentRoutes.post("/createComment", userAuth, createComment);

//Select All Comment
commentRoutes.get("/selectAllComment", userAuth, selectAllComment);

//Select Comments
commentRoutes.get("/selectComment/:id", userAuth, selectComment);

//Update Comment
commentRoutes.patch("/updateComment/:id", userAuth, updateComment);

//Delete Comment
commentRoutes.delete("/deleteComment/:id", userAuth, deleteComment);

module.exports = commentRoutes;
