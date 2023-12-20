import CommentRepository from "./comments.repository.js";
export default class CommentController {
  constructor() {
    this.commentRepository = new CommentRepository();
  }

  createComment(req, res) {}

  getComment(req, res) {}

  updateComment(req, res) {}

  deleteComment(req, res) {}
}
