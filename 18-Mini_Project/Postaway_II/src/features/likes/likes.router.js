import express from "express";
import LikeController from "./likes.controller.js";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/addLike", (req, res) => {
  likeController.addLike(req, res);
});
likeRouter.post("/removeLike/:likeId", (req, res) => {
  likeController.removeLike(req, res);
});
export default likeRouter;
