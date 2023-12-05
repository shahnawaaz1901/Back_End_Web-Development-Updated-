import ApplicationError from "../error/application.error.js";
import PostsModel from "../posts/posts.model.js";
import CommentsModel from "./comments.model.js";
export default class CommentsController {
  // For adding new Comment
  add(req, res) {
    const { comment, postId } = req.body;
    const userId = req.userId;
    if (!comment || !postId) {
      //* 406 Status Code means Server Not Accepted this Request
      throw new ApplicationError("Please Enter Valid Comment", 406);
    }
    const result = CommentsModel.addComment(userId, postId, comment);
    if (!result.success) {
      throw new ApplicationError(result.msg, 404);
      // return res.status(404).send(result.msg);
    } else {
      res.status(200).send(result.msg);
    }
  }

  // Get all Comments of a Post
  get(req, res) {
    const { postId } = req.params;
    if (!postId) {
      throw new ApplicationError("Please enter valid postId", 404);
    }
    const commentForPost = CommentsModel.getComments(postId);
    res.status(200).send(commentForPost);
  }

  // For Update Comment
  update(req, res) {
    const { postId } = req.params;
    const { comment, commentId } = req.body;
    const userId = req.userId;
    if (!postId || !comment || !commentId) {
      throw new ApplicationError("Something went wrong", 404);
    }
    const updatedResult = CommentsModel.updateComment(
      postId,
      userId,
      commentId,
      comment
    );
    if (!updatedResult.success) {
      throw new ApplicationError(updatedResult.msg, 404);
    } else {
      res.status(200).send(updatedResult.msg);
    }
  }

  // For Delete Comment
  delete(req, res) {
    const userId = req.userId;
    const { postId, commentId } = req.query;
    const result = CommentsModel.deleteComment(userId, postId, commentId);
    if (!result.success) {
      throw new ApplicationError(result.msg, 404);
    } else {
      res.status(200).send(result.msg);
    }
  }
}
