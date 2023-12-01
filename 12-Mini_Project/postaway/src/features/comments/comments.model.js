import PostsModel from "../posts/posts.model.js";
let id = 1;
export default class CommentsModel {
  constructor(_userId, _postId, _comment) {
    this.id = id++;
    this.userId = _userId;
    this.postId = _postId;
    this.comment = _comment;
    this.update = false;
  }

  static addComment(userId, postId, comment) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId);
    if (!post) {
      return {
        success: false,
        msg: "Post not found",
      };
    }

    const newComment = new CommentsModel(userId, postId, comment);
    commentsData.push(newComment);
    return { success: true, msg: "Comment Successfully" };
  }

  static updateComment(postId, userId, commentId, updatedComment) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId);
    if (!post) {
      return {
        success: false,
        msg: "Post not found",
      };
    }

    const commentIndex = commentsData.findIndex(
      (u) => u.id == commentId && u.userId == userId
    );

    if (commentIndex == -1) {
      return {
        success: false,
        msg: "Comment not found",
      };
    }

    const updatedDoc = {
      comment: updatedComment,
      update: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    };
    Object.assign(commentsData[commentIndex], updatedDoc);
    return {
      success: true,
      msg: "Comment Updated Successfully",
    };
  }

  static getComments(postId) {
    return commentsData.filter((f) => f.postId == postId);
  }

  static deleteComment(userId, postId, commentId) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId);

    if (!post) {
      return { success: false, msg: "Post Not Found !" };
    }

    const commentIndex = commentsData.findIndex((c) => c.id == commentId);
    if (commentIndex == -1) {
      return { success: false, msg: "Comment Not Found !" };
    }

    commentsData.splice(commentIndex, 1);
    return { success: true, msg: "Comment deleted successfully" };
  }
}

var commentsData = [];
