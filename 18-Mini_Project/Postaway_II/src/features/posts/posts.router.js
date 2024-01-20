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
  (req, res, next) => {
    postController.createPost(req, res, next);
  }
);
postRouter.get("/getPosts", (req, res, next) => {
  postController.getPosts(req, res, next);
});

postRouter.get("/getOnePost/:postId", (req, res, next) => {
  postController.getOnePost(req, res, next);
});
postRouter.put(
  "/updatePost/:postId",
  filePath,
  upload.single("imageURL"),
  (req, res, next) => {
    postController.updatePost(req, res, next);
  }
);
postRouter.delete("/deletePost/:postId", (req, res, next) => {
  postController.deletePost(req, res, next);
});

export default postRouter;
