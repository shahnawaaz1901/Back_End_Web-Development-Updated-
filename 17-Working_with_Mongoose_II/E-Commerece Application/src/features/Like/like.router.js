import LikeController from "./like.controller.js";
import express from "express";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/", (req, res) => {
  likeController.likeItem(req, res);
});

likeRouter.get("/", (req, res) => {
  likeController.getLikes(req, res);
});

export default likeRouter;
