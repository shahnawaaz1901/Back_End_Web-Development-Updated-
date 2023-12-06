import express from "express";
import LikesController from "./likes.controller.js";

const likesRouter = express.Router();
const likesController = new LikesController();

likesRouter.get("/:postId", likesController.getPostLikes); //* Get all Likes of a Post
likesRouter.post("/addLike/:postId", likesController.addLikeToPost); //* Add Like to Post
likesRouter.put("/removeLike/:postId", likesController.removeLikeToPost); //* Remove Like of Post

export default likesRouter;
