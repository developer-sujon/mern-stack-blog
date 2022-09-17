//External import
const categoryRoutes = require("express").Router();

//Internal Import
const { userAuth, adminAuth } = require("../middleware/checkAuthLogin");
const {
  createCategory,
  selectAllCategory,
  selectCategory,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryControllers");

//Create Category
categoryRoutes.post("/createCategory", userAuth, adminAuth, createCategory);

//Select Categorys
categoryRoutes.get("/selectAllCategory", selectAllCategory);

//Select Categorys
categoryRoutes.get("/selectCategory/:id", userAuth, adminAuth, selectCategory);

//Update Category
categoryRoutes.patch(
  "/updateCategory/:id",
  userAuth,
  adminAuth,
  updateCategory,
);

//Delete Category
categoryRoutes.delete(
  "/deleteCategory/:id",
  userAuth,
  adminAuth,
  deleteCategory,
);

module.exports = categoryRoutes;
