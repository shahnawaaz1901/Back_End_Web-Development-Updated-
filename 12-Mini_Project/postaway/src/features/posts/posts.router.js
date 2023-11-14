import express from "express";
import PostsController from "./posts.controller.js";

const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.post("/", postsController.createPost);
postsRouter.get("/", postsController.getAllPosts);
postsRouter.get("/:postId", postsController.getOnePost);
postsRouter.put("/:postId", postsController.updatePost);
postsRouter.delete("/:postId", postsController.deletePost);

export default postsRouter;
