import PostsModel from "../posts/posts.model.js";
import CommentsModel from "./comments.model.js";
export default class CommentsController {
  // For adding new Comment
  add(req, res) {
    const { comment, postId } = req.body;
    const userId = req.userId;
    if (!comment || !postId) {
      return;
    }
    const result = CommentsModel.addComment(userId, postId, comment);
    if (!result) {
      return res.status(404).send("Post Not Found");
    } else {
      res.status(200).send(result);
    }
  }

  // Get all Comments of a Post
  get(req, res) {
    const { userId } = req;
    const { postId } = req.params;
    const commentForPost = CommentsModel.getComments(postId);
    if (!commentForPost) {
      return res.status(400).send("Post Not Found ");
    } else {
      return res.status(200).send(commentForPost);
    }
  }

  // For Update Comment
  update(req, res) {
    const { postId } = req.params;
    const { comment, commentId } = req.body;
    const userId = req.userId;
    const updatedResult = CommentsModel.updateComment(
      postId,
      userId,
      commentId,
      comment
    );

    if (updatedResult instanceof PostsModel) {
      res.status(200).send(updatedResult);
    } else {
      res.status(404).send(updatedResult);
    }
  }

  // For Delete Comment
  delete(req, res) {
    const userId = req.userId;
    const { postId, commentId } = req.query;
    const result = CommentsModel.deleteComment(userId, postId, commentId);
    if (result instanceof PostsModel) {
      res.status(200).send(result);
    } else {
      res.status(404).send(result);
    }
  }
}
