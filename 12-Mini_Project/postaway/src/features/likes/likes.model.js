let id = 1;
import PostsModel from "../posts/posts.model.js";
export default class LikesModel {
  constructor(userId, postId) {
    this.id = id++;
    this.postId = postId;
    this.userId = userId;
  }

  static add(postId, userId) {
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return;
    }

    if (!allPosts[postIndex].likes) {
      allPosts[postIndex].likes = [];
    }
    for (let every of allPosts[postIndex].likes) {
      if (every.userId == userId) {
        return allPosts[postIndex];
      }
    }
    allPosts[postIndex].likes.push(new LikesModel(userId, postId));
    return allPosts[postIndex];
  }

  static remove(postId, userId) {
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return "Post Not Found or User Not Like this Post !!";
    }
    // console.log(allPosts[postIndex]);
    if (!allPosts[postIndex].likes) {
      return "User Not Like This Post !!";
    }

    const likeArray = allPosts[postIndex].likes;
    const userIndex = likeArray.findIndex((l) => l.userId == userId);
    if (userIndex == -1) {
      return "User Not Like This Post !!";
    }
    likeArray.splice(userIndex, 1);
    return allPosts[postIndex];
  }
}
