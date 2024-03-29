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

      //* Check Post Exist or Not
      if (!postId) {
        throw new ApplicationError("PostId can't be Empty", 406);
      }

      //* Check Comment Provided or Not
      if (!comment) {
        throw new ApplicationError("Comment can't be Empty", 406);
      }

      const newComment = await this.commentRepository.create({
        userId,
        postId,
        comment,
      });
      return res.status(201).json({ success: true, comment: newComment });
    } catch (error) {
      next(error);
    }
  }

  //* Get Comments of a Post
  async getComments(req, res, next) {
    try {
      const { postId } = req.params;
      if (!postId) {
        throw new ApplicationError("PostId Can't be Empty", 406);
      }
      const comments = await this.commentRepository.get(postId);
      res.status(200).json({ success: true, comments });
    } catch (error) {
      next(error);
    }
  }

  //* Get a Single Comment
  async getOneComment(req, res, next) {
    try {
      const { commentId } = req.params;
      if (!commentId) {
        throw new ApplicationError("Please Provide CommentId", 406);
      }
      const comment = await this.commentRepository.getOne(commentId);
      res.status(200).json({ success: true, comment });
    } catch (error) {
      next(error);
    }
  }

  //* Update a Comment
  async updateComment(req, res, next) {
    try {
      const { userId } = req;
      const { commentId, newComment } = req.body;
      //* Check CommentId is Empty or Not
      if (!commentId) {
        throw new ApplicationError("CommentId Can't be Empty", 406);
      }

      //* Check if updatedComment are Empty or Not
      if (!newComment) {
        throw new ApplicationError("New Comment Can't be Empty !!", 406);
      }

      const updatedComment = await this.commentRepository.update({
        userId,
        commentId,
        newComment,
      });
      res.status(200).json({ success: true, comment: updatedComment });
    } catch (error) {
      next(error);
    }
  }

  //* Delete a Comment
  async deleteComment(req, res, next) {
    try {
      const { userId } = req;
      const { commentId } = req.params;

      //* Check if CommentId is Empty or Not
      if (!commentId) {
        throw new ApplicationError("CommentId Can't be Empty", 406);
      }

      await this.commentRepository.delete({
        userId,
        commentId,
      });
      res
        .status(200)
        .json({ success: true, message: "Comment Deleted Successfully !!" });
    } catch (error) {
      next(error);
    }
  }
}
