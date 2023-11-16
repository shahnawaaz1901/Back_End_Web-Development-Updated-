import express from "express";
import LikesController from "./likes.controller.js";

const likesRouter = express.Router();
const likesController = new LikesController();

likesRouter.post("/:postId/addLike", likesController.addLikeToPost);
likesRouter.post("/:postId/removeLike", likesController.removeLikeToPost);

export default likesRouter;
