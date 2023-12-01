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
      return;
    }

    const newComment = new CommentsModel(userId, postId, comment);
    commentsData.push(newComment);
    console.log(commentsData);
    return "Comment Successfully";
  }

  static updateComment(postId, userId, commentId, updatedComment) {
    if (!updatedComment) {
      return;
    }
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

    const updatedDoc = {
      comment: updatedComment,
      update: {
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      },
    };
    Object.assign(post.comments[commentIndex], updatedDoc);
    return post;
  }

  static deleteComment(userId, postId, commentId) {
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

var commentsData = [];