import LikeController from "./like.controller.js";
import express from "express";

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.post("/", (req, res) => {
  likeController.likeItem(req, res);
});

export default likeRouter;
