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
      if (!req.body.caption && !req.body.imageURL && !req.body.location) {
        throw new ApplicationError("Minimum One field is Required", 406);
      }
      const savedPost = await this.postRepository.new({
        user: req.userId,
        caption: req.body.caption,
        imageURL: req.body.imageURL,
        location: req.body.location,
        timeStamp: new Date().toString(),
        tags: req.body.tags || undefined,
      });
      return res.status(201).json({ sucess: true, post: savedPost });
    } catch (error) {
      next(error);
    }
  }

  //* Get All Post of Self or Other User
  async getPosts(req, res, next) {
    try {
      //* If user want to see Other User's Post so User can do by Passing the Other UserId in Query Parameter */
      let userId = req.query.userId || req.userId;
      let posts = await this.postRepository.get(userId);
      res.status(200).json({ success: true, posts });
    } catch (error) {
      next(error);
    }
  }

  //* Get Specific Post
  async getOnePost(req, res, next) {
    try {
      const { postId } = req.params;
      const post = await this.postRepository.getOne(postId);
      if (!post) {
        throw new ApplicationError("Post not found !!", 404);
      }
      return res.status(200).json({ success: true, post });
    } catch (error) {
      next(error);
    }
  }

  //* Update Post
  async updatePost(req, res, next) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      if (!postId) {
        throw new ApplicationError("PostId is mendatory !!", 406);
      }
      const updatedData = {};
      if (req.body.tags) {
        updatedData.tags = req.body.tags.split(",");
      } else {
        updatedData.tags = [];
      }
      if (req.file) {
        updatedData.imageURL = req.file.filename;
      }

      if (req.body.caption) {
        updatedData.caption = req.body.caption;
      }

      if (req.body.location) {
        updatedData.location = req.body.location;
      }
      const updatedPost = await this.postRepository.update(updatedData, {
        userId,
        postId,
      });
      if (!updatedPost) {
        throw new ApplicationError("Post not found", 404);
      }
      return res.status(200).send({ success: true, post: updatedPost });
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      if (!postId) {
        throw new ApplicationError("PostId is mendatory !!", 406);
      }
      const result = await this.postRepository.delete({ userId, postId });
      if (result) {
        return res
          .status(200)
          .json({ success: true, message: "Post Deleted Successfully !" });
      }
      throw new ApplicationError("Post not found for the User !!", 404);
    } catch (error) {
      next(error);
    }
  }
}
