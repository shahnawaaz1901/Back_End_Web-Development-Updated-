import express from "express";
import CommentsController from "./comments.controller.js";

const commentsRouter = express.Router();
const commentsController = new CommentsController();

commentsRouter.get("/:postId", commentsController.get);
commentsRouter.post("/", commentsController.add);
commentsRouter.put("/", commentsController.update);
commentsRouter.delete("/:commentId", commentsController.delete);

export default commentsRouter;
