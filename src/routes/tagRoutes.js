//External import
const tagRoutes = require("express").Router();

//Internal Import
const { userAuth } = require("../middleware/checkAuthLogin");
const {
  createTag,
  selectAllTag,
  selectTag,
  updateTag,
  deleteTag,
} = require("../controller/tagControllers");

//Create Category
tagRoutes.post("/createTag", userAuth, createTag);

//Select Categorys
tagRoutes.get("/selectAllTag", userAuth, selectAllTag);

//Select Categorys
tagRoutes.get("/selectTag/:id", userAuth, selectTag);

//Update Category
tagRoutes.patch("/updateTag/:id", userAuth, updateTag);

//Delete Category
tagRoutes.delete("/deleteTag/:id", userAuth, deleteTag);

module.exports = tagRoutes;
