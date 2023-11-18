import CommentsModel from "./comments.model.js";
export default class CommentsController {
  add(req, res) {
    const { postId, comment } = req.body;
    const userId = req.userId;
    const result = CommentsModel.addComment(userId, postId, comment);
    if (!result) {
      return res.status(404).send("Post Not Found !!");
    }
    return res.status(201).send(result);
  }

  update(req, res) {}

  remove(req, res) {}
}
