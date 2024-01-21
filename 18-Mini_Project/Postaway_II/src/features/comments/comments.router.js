import express from "express";
import CommentController from "./comments.controller.js";

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/newComment", (req, res, next) => {
  commentController.createComment(req, res, next);
});

commentRouter.get("/getComments/:postId", (req, res, next) => {
  commentController.getComments(req, res, next);
});

commentRouter.get("/getComment/:commentId", (req, res, next) => {
  commentController.getOneComment(req, res, next);
});

commentRouter.put("/updateComment", (req, res, next) => {
  commentController.updateComment(req, res, next);
});

commentRouter.delete("/deleteComment/:commentId", (req, res, next) => {
  commentController.deleteComment(req, res, next);
});

export default commentRouter;
