import express from "express";
import CommentsController from "./comments.controller.js";

const commentsRouter = express.Router();
const commentsController = new CommentsController();

commentsRouter.post("/add/:postId", commentsController.add);
commentsRouter.put("/update/:postId", commentsController.update);
commentsRouter.delete("/delete", commentsController.delete);

export default commentsRouter;
