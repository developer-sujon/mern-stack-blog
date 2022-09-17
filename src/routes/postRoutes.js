//External import
const postRoutes = require("express").Router();

//Internal Import
const { userAuth } = require("../middleware/checkAuthLogin");
const {
  createPost,
  selectAllPost,
  selectPostBySlug,
  updatePost,
  deletePost,
  likePost,
  disLikePost,
  selectPost,
} = require("../controller/postControllers");
const { imageUpload } = require("../middleware/multer/uploadPhoto");

//Create Post
postRoutes.post(
  "/createPost",
  userAuth,
  imageUpload.single("postThumbnail"),
  createPost,
);

//Select Posts
postRoutes.get("/selectAllPost", selectAllPost);

//Select Posts By Slug
postRoutes.get("/selectPostBySlug/:slug", selectPostBySlug);

//Select Post
postRoutes.get("/selectPost/:id", userAuth, selectPost);

//Update Post
postRoutes.patch(
  "/updatePost/:id",
  userAuth,
  imageUpload.single("postThumbnail"),
  updatePost,
);

//Delete Post
postRoutes.delete("/deletePost/:id", userAuth, deletePost);

//Like Post
postRoutes.put("/likePost/:id", userAuth, likePost);

//DisLike Post
postRoutes.put("/disLikePost/:id", userAuth, disLikePost);

module.exports = postRoutes;
