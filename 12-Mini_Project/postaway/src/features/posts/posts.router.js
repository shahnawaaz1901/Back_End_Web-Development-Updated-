import express from "express";
import PostsController from "./posts.controller.js";
import upload from "../../middlewares/file-upload.middleware.js";

const postsRouter = express.Router();
const postsController = new PostsController();

postsRouter.post("/", upload.single("postURL"), postsController.createPost);
postsRouter.get("/", postsController.getAllPosts);
postsRouter.put("/:postId", upload.single("postURL"), postsController.updatePost);
postsRouter.delete("/:postId", postsController.deletePost);
postsRouter.get("/:postId", postsController.getOnePost);

export default postsRouter;