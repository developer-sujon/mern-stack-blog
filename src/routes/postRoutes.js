//External Import
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
} = require("../controller/postControllers");
const { imageUpload, resizePost } = require("../middleware/multer/uploadPhoto");

//Create Post
postRoutes.post(
  "/createPost",
  userAuth,
  imageUpload.single("postThumbnail"),
  resizePost,
  createPost,
);

//Select Posts
postRoutes.get("/selectAllPost", userAuth, selectAllPost);

//Select Posts
postRoutes.get("/selectPostBySlug/:slug", userAuth, selectPostBySlug);

//Update Post
postRoutes.patch(
  "/updatePost/:id",
  userAuth,
  imageUpload.single("postThumbnail"),
  resizePost,
  updatePost,
);

//Delete Post
postRoutes.delete("/deletePost/:id", userAuth, deletePost);

//Like Post
postRoutes.put("/likePost/:id", userAuth, likePost);

//DisLike Post
postRoutes.put("/disLikePost/:id", userAuth, disLikePost);

module.exports = postRoutes;
