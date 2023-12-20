import { response } from "express";
import ApplicationError from "../error/error.application.js";
import PostRepository from "./posts.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(req, res) {
    console.log(req.url);
    try {
      /* Because if user not upload any image then req.file value is undefined */
      if (req.file) {
        req.body.imageURL = req.file.filename;
      }

      if (req.body.tags) {
        req.body.tags = req.body.tags.split(",");
      }

      const savedPost = await this.postRepository.new({
        user: req.userId,
        caption: req.body.caption,
        imageURL: req.body.imageURL,
        location: req.body.location,
        timeStamp: new Date().toString(),
        tags: req.body.tags,
      });
      return res.status(201).json({ sucess: true, post: savedPost });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getPosts(req, res) {
    let { userId } = req;

    //* If user want to see Other User's Post so User can do by Passing the Other UserId in Query Parameter
    if (req.params.userId) {
      userId = req.params.userId;
    }

    const posts = await this.postRepository.get(userId);
    res.status(200).send(posts);
  }

  async getOnePost(req, res) {
    const { postId } = req.params;
    const post = await this.postRepository.getOne(postId);
    return res.status(200).send(post);
  }

  async updatePost(req, res) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      if (req.body.tags) {
        req.body.tags = req.body.tags.split(",");
      }

      if (req.file) {
        req.body.imageURL = req.file.filename;
      }

      const updatedData = req.body;
      const updatedPost = await this.postRepository.update(updatedData, {
        userId,
        postId,
      });
      if (updatedPost) {
        return res.status(200).send({ success: true, post: updatedPost });
      }
      res.status(404).send({ success: false, message: "Post not found !!" });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message, 500);
    }
  }

  async deletePost(req, res) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      const result = await this.postRepository.delete({ userId, postId });
      if (result) {
        return res
          .status(200)
          .json({ success: true, message: "Post Deleted Successfully !" });
      }
      res
        .status(404)
        .json({ success: false, message: "Post not found for the User !!" });
    } catch (error) {
      console.log(error);
      throw new ApplicationError(error.message, 404);
    }
  }
}
