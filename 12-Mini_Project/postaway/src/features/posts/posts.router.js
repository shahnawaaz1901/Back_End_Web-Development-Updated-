import express from "express";
import PostsController from "./posts.controller.js";
import upload from "../../middlewares/file-upload.middleware.js";

const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.post(
  "/create",
  upload.single("postURL"),
  postsController.createPost
);
postsRouter.get("/get", postsController.getAllPosts);
postsRouter.put("/update/:postId", postsController.updatePost);
postsRouter.delete("/delete/:postId", postsController.deletePost);
postsRouter.get("/getOne/:postId", postsController.getOnePost);

export default postsRouter;
