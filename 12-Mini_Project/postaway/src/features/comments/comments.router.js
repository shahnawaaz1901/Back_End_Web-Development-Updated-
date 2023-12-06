import express from "express";
import CommentsController from "./comments.controller.js";

const commentsRouter = express.Router();
const commentsController = new CommentsController();

commentsRouter.get("/get/:postId", commentsController.get); //* Get Comments of a Post
commentsRouter.post("/create", commentsController.add); //* Create Comment on Post
commentsRouter.put("/update/:postId", commentsController.update); //* Update Comment on Post
commentsRouter.delete("/delete", commentsController.delete); //* Delete Comment of Post

export default commentsRouter;
