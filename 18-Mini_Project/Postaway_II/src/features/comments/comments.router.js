import express from "express";
import CommentController from "./comments.controller.js";
const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.post("/newComment", (req, res) => {
  commentController.createComment(req, res);
});

commentRouter.get("/getComment/:commentId", (req, res) => {
  commentController.getComment(req, res);
});

commentRouter.put("/updateComment", (req, res) => {
  commentController.updateComment(req, res);
});

commentRouter.delete("/deleteComment/:commentId", (req, res) => {
  commentController.deleteComment(req, res);
});

export default commentRouter;
