import express from "express";
import LikeController from "./likes.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/addLike", (req, res, next) => {
  likeController.addLike(req, res, next);
});
likeRouter.post("/removeLike/:likeId", (req, res, next) => {
  likeController.removeLike(req, res, next);
});
export default likeRouter;
