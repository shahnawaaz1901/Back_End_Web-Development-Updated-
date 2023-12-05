let id = 1;
import PostsModel from "../posts/posts.model.js";
export default class LikesModel {
  constructor(_userId, _postId, _type) {
    this.id = id++;
    this.postId = _postId;
    this.userId = _userId;
    this.time = new Date().toString();
  }

  static add(postId, userId) {
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return { success: false, msg: "Post not found" };
    }
    for (let every of likesData) {
      if (every.userId == userId && every.postId == postId) {
        return { success: true, msg: "Already Liked this Post" };
      }
    }
    const newLike = new LikesModel(userId, postId)
    likesData.push(newLike);
    return { success: true, msg: "Like Addded Successfully" };
  }

  static remove(postId, userId) {
    let allPosts = PostsModel.getAll(userId);

    // 1. Check if Post Exist or Not
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return { success: false, msg: "Post Not Found !!" };
    }

    // 2. Check if User Like this Post or Not
    const findLikeIndex = likesData.findIndex(
      (f) => f.postId == postId && f.userId == userId
    );

    if (findLikeIndex == -1) {
      return { success: false, msg: "User Not like the Post" };
    }

    likesData.splice(findLikeIndex, 1);
    return { success: true, msg: "Like Remove Successfully" };
  }

  static get(postId, userId) {
    const allPosts = PostsModel.getAll(userId);
    console.log(allPosts);
    const post = allPosts.find((p) => p.id == postId);
    if (!post) {
      return {
        success: false,
        msg: "Post not found",
      };
    }
    return { success: true, data: likesData.filter((f) => f.postId == postId) };
  }
}

var likesData = [];
