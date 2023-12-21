import CommentRepository from "./comments.repository.js";
export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  async createComment(req, res) {
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
    res.status(404).send({ success: false, message: "Post not found !!" });
  }

  getOneComment(req, res) {
    const { userId } = req;
    const { postId, commentId, newComment } = req.body;
  }

  updateComment(req, res) {}

  deleteComment(req, res) {}
}
