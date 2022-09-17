//External import
const tagRoutes = require("express").Router();

//Internal Import
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");
const {
  createTag,
  selectAllTag,
  selectTag,
  updateTag,
  deleteTag,
} = require("../controller/tagControllers");

//Create Category
tagRoutes.post("/createTag", userAuth, adminAuth, createTag);

//Select Categorys
tagRoutes.get("/selectAllTag", userAuth,  selectAllTag);

//Select Categorys
tagRoutes.get("/selectTag/:id", userAuth, adminAuth, selectTag);

//Update Category
tagRoutes.patch("/updateTag/:id", userAuth, adminAuth, updateTag);

//Delete Category
tagRoutes.delete("/deleteTag/:id", userAuth, adminAuth, deleteTag);

module.exports = tagRoutes;
