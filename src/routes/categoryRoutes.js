//External Import
const categoryRoutes = require("express").Router();

//Internal Import
const { userAuth } = require("../middleware/checkAuthLogin");
const {
  createCategory,
  selectAllCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryControllers");

//Create Category
categoryRoutes.post("/createCategory", userAuth, createCategory);

//Select Categorys
categoryRoutes.get("/selectAllCategory", userAuth, selectAllCategory);

//Select Categorys
categoryRoutes.get("/selectCategory/:id", userAuth, selectCategory);

//Update Category
categoryRoutes.patch("/updateCategory/:id", userAuth, updateCategory);

//Delete Category
categoryRoutes.delete("/deleteCategory/:id", userAuth, deleteCategory);

module.exports = categoryRoutes;
