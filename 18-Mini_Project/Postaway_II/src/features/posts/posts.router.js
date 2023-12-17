import express from "express";
import PostController from "./posts.controller.js";
import upload from "../../middlewares/multer.fileUpload.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.post("/createPost", upload.single("imageURL"), (req, res) => {
  postController.createPost(req, res);
});
postRouter.get("/getPosts", (req, res) => {});
postRouter.get("/getOnePost/:postId", (req, res) => {});
postRouter.put("/updatePost/:postId", (req, res) => {});
postRouter.delete("/deletePost/:postId", (req, res) => {});

export default postRouter;
