import express from "express";
import LikesController from "./likes.controller.js";

const likesRouter = express.Router();
const likesController = new LikesController();

likesRouter.get("/",likesController.getAllLikes);
likesRouter.post("/addLike/:postId", likesController.addLikeToPost);
likesRouter.post("/removeLike/:postId", likesController.removeLikeToPost);

export default likesRouter;
