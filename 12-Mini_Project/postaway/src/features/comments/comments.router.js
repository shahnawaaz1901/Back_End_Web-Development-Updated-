import express from "express";
import CommentsController from "./comments.controller.js";

const commentsRouter = express.Router();
const commentsController = new CommentsController();

commentsRouter.get("/:postId", commentsController.get); //* Get Comments of a Post
commentsRouter.post("/", commentsController.add); //* Create Comment on Post
commentsRouter.put("/:postId", commentsController.update); //* Update Comment on Post
commentsRouter.delete("/:commentId", commentsController.delete); //* Delete Comment of Post

export default commentsRouter;
