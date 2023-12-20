import express from "express";
import PostController from "./posts.controller.js";
import upload from "../../middlewares/multer.fileUpload.js";
import filePath from "../../middlewares/setPath.middleware.js";
const postRouter = express.Router();
const postController = new PostController();

postRouter.post(
  "/createPost",
  filePath,
  upload.single("imageURL"),
  (req, res) => {
    postController.createPost(req, res);
  }
);
postRouter.get("/getPosts", (req, res) => {
  postController.getPosts(req, res);
});
postRouter.get("/getOnePost/:postId", (req, res) => {
  postController.getOnePost(req, res);
});
postRouter.put(
  "/updatePost/:postId",
  filePath,
  upload.single("imageURL"),
  (req, res) => {
    postController.updatePost(req, res);
  }
);
postRouter.delete("/deletePost/:postId", (req, res) => {
  postController.deletePost(req, res);
});

export default postRouter;
