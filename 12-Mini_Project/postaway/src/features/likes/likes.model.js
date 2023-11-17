import PostsModel from "../posts/posts.model.js";
export default class LikesModel {
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

    allPosts[postIndex].likes.push({ userId });
    return allPosts[postIndex];
  }

  static remove(postId, userId) {
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    if (postIndex == -1) {
      return;
    }

    if (!allPosts[postIndex].likes) {
      return;
    }

    const userIndex = allPosts[postIndex].likes((u) => u.userId == userId);
    if (userIndex == -1) {
      return;
    }

    allPosts[postIndex].likes.splice(userIndex, 1);
    return allPosts[postIndex];
  }
}
