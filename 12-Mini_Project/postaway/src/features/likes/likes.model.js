let id = 1;
import PostsModel from "../posts/posts.model.js";
export default class LikesModel {
  constructor(userId, postId) {
    this.id = id++;
    this.postId = postId;
    this.userId = userId;
    this.time = new Date().toString();
  }

  static add(postId, userId) {
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return;
    }
    for (let every of likesData) {
      if (every.userId == userId && every.postId == postId) {
        return "Already Liked this Post";
      }
    }
    const newLike = new LikesModel(userId, postId);
    likesData.push(newLike);
    return "Like Addded Successfully";
  }

  static remove(postId, userId) {
    let allPosts = PostsModel.getAll(userId);

    // 1. Check if Post Exist or Not
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return "Post Not Found !!";
    }

    // 2. Check if User Like this Post or Not
    const findLikeIndex = likesData.findIndex(
      (f) => f.postId == postId && f.userId == userId
    );

    if (findLikeIndex == -1) {
      return "User Not like the Post";
    }

    likesData.splice(findLikeIndex, 1);
    return "Like Remove Successfully";
  }
}

var likesData = [];
