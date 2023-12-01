import express from "express";
import LikesController from "./likes.controller.js";

const likesRouter = express.Router();
const likesController = new LikesController();

likesRouter.post("/addLike/:postId", likesController.addLikeToPost);
likesRouter.post("/removeLike/:postId", likesController.removeLikeToPost);
likesRouter.get("/",likesController.getPostLikes);

export default likesRouter;
