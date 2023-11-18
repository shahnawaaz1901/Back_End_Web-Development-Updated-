import express from "express";
import CommentsController from "./comments.controller.js";

const commentsRouter = express.Router();
const commentsController = new CommentsController();

commentsRouter.post("/add", commentsController.add);
commentsRouter.put("/update/:postId", commentsController.update);
commentsRouter.delete("/delete/:postId", commentsController.remove);

export default commentsRouter;
