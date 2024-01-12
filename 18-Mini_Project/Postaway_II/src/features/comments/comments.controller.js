import ApplicationError from "../error/error.class.js";
import CommentRepository from "./comments.repository.js";
export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  //* New Comment on a Post
  async createComment(req, res, next) {
    try {
      const { userId } = req;
      const { postId, comment } = req.body;
      console.log(userId, postId, comment);
      if (!postId || !comment) {
        throw new ApplicationError("Please Provide Required Information", 406);
      }
      const newComment = await this.commentRepository.create({
        userId,
        postId,
        comment,
      });
      return res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Get Comments of a Post
  async getComments(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await this.commentRepository.get(postId);
      res.status(200).json({ success: true, comments });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Get a Single Comment
  async getOneComment(req, res, next) {
    try {
      const { postId, commentId } = req.body;
      if (!postId || !commentId) {
        throw new ApplicationError("Please Provide Required Information", 406);
      }
      const comment = await this.commentRepository.getOne();
      res.status(200).json({ success: true, comment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Update a Comment
  async updateComment(req, res, next) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      const { commentId, newComment } = req.body;
      if (!postId || !commentId || !newComment) {
        throw new ApplicationError("Please Provide required fields !!", 406);
      }
      const updatedComment = await this.commentRepository.update({
        userId,
        postId,
        commentId,
        newComment,
      });
      res.status(200).json({ success: true, comment: updatedComment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //* Delete a Comment
  async deleteComment(req, res, next) {
    try {
      const { userId } = req;
      const { postId, commentId } = req.query;
      await this.commentRepository.delete({
        userId,
        postId,
        commentId,
      });
      res
        .status(200)
        .json({ success: true, message: "Comment Deleted Successfully !!" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
