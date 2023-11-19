import PostsModel from "../posts/posts.model.js";
import CommentsModel from "./comments.model.js";
export default class CommentsController {
  add(req, res) {
    const { postId } = req.params;
    const { comment } = req.body;
    const userId = req.userId;
    const result = CommentsModel.addComment(userId, postId, comment);
    if (result instanceof PostsModel) {
      return res.status(201).send(result);
    }
    return res.status(404).send(result);
  }

  update(req, res) {}

  remove(req, res) {}
}
