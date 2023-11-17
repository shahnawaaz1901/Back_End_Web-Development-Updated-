import PostsModel from "../posts/posts.model.js";
export default class LikesModel {
  static add(postId, userId) {
    console.log(postId, userId);
    let allPosts = PostsModel.getAll(userId);
    console.log(allPosts);
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

  static remove(postId, userId) {}
}
