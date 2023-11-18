import PostsModel from "../posts/posts.model.js";
let id = 1;
export default class CommentsModel {
  constructor(userId, postId, comment) {
    this.id = id;
    this.userId = userId;
    this.postId = postId;
    this.comment = comment;
  }

  static addComment(userId, postId, comment) {
    const allPosts = PostsModel.getAll(userId);
    console.log(allPosts);
    const post = allPosts.find((p) => p.id == postId);
    if (!post) {
      console.log("Inside Post not Found");
      return;
    }
    if (!post.comments) {
      post.comment = [];
    }
    post.comment.push(new CommentsModel(userId, postId, comment));
    return post;
  }

  static removeComment(postId, userId, commentId) {}

  static updateComment(postId, userId, commentId) {}
}
