import CommentRepository from "./comments.repository.js";
export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(req, res) {
    try {
      const { userId } = req;
      const { postId, comment } = req.body;
      console.log(userId, postId, comment);
      const newComment = await this.commentRepository.create({
        userId,
        postId,
        comment,
      });
      if (newComment) {
        return res.status(201).json({ success: true, comment: newComment });
      }
      res.status(404).json({ success: false, message: "Post not found !!" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error !!" });
    }
  }

  getOneComment(req, res) {
    const { userId } = req;
    const { postId, commentId, newComment } = req.body;
  }

  async updateComment(req, res) {
    try {
      const { userId } = req;
      const { postId } = req.params;
      const { commentId, newComment } = req.body;
      if (!postId || !commentId || !newComment) {
        return res.status(406).json({
          success: false,
          message: "Please Provide required fields !!",
        });
      }
      const updatedComment = await this.commentRepository.update({
        userId,
        postId,
        commentId,
        newComment,
      });
      res.status(200).json({ success: true, comment: updatedComment });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error !!" });
    }
  }

  async deleteComment(req, res) {
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
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error !!" });
    }
  }
}
