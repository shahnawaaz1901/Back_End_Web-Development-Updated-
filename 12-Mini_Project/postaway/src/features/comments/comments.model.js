import PostsModel from "../posts/posts.model.js";
let id = 1;
export default class CommentsModel {
  constructor(_id, _userId, _postId, _comment) {
    this.id = _id;
    this.userId = _userId;
    this.postId = _postId;
    this.comment = _comment;
  }

  static addComment(userId, postId, comment) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId);
    if (!post) {
      return "Post Not Found !!";
    }
    if (post.comments == undefined) {
      post.comments = [];
    }
    post.comments.push(new CommentsModel(id++, userId, postId, comment));
    return post;
  }

  static updateComment(postId, userId, commentId, updatedComment) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId && p.userId == userId);
    if (!post) {
      return "Post Not Found !";
    }

    if (!post.comments) {
      return "Comment Not Found !";
    }

    const commentIndex = post.comments.findIndex(
      (u) => u.id == commentId && u.userId == userId
    );

    if (commentIndex == -1) {
      return "Comment Not Found !";
    }

    post.comments[commentIndex] = new CommentsModel(
      commentId,
      userId,
      postId,
      updatedComment
    );

    return post;
  }

  static deleteComment(postId, userId, commentId) {
    const allPosts = PostsModel.getAll(userId);
    const post = allPosts.find((p) => p.id == postId);

    if (!post) {
      return "Post Not Found !";
    }

    if (!post.comments) {
      return "Comment Not Found !";
    }

    const commentIndex = post.comments.findIndex((c) => c.id == commentId);
    if (commentIndex == -1) {
      return "Comment Not Found !";
    }

    post.comments.splice(commentIndex, 1);
    return post;
  }
}
