import mongoose from "mongoose";
import ApplicationError from "../error/error.class.js";
import PostRepository from "./posts.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  //* New Post
  async createPost(req, res, next) {
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
      next(error);
    }
  }

  //* Get All Post of Self or Other User
  async getPosts(req, res, next) {
    try {
      //* If user want to see Other User's Post so User can do by Passing the Other UserId in Query Parameter */
      let userId = req.params.userId || req.userId;
      const posts = await this.postRepository.get(userId);
      res.status(200).json({ success: true, posts });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getOnePost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await this.postRepository.getOne(postId);
      return res.status(200).json({ success: true, post });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updatePost(req, res, next) {
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
      throw new ApplicationError("Post not found", 404);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
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
      if (error instanceof mongoose.Error) {
        throw new Error(error.message);
      }
      throw new ApplicationError(error.message, 404);
    }
  }
}
