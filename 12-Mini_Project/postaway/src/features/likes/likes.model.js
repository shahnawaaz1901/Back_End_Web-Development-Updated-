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
    for (let every of allPosts[postIndex].likes) {
      if (every.userId == userId) {
        return allPosts[postIndex];
      }
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
      console.log("Inside the postIndex");
      return;
    }
    // console.log(allPosts[postIndex]);
    if (!allPosts[postIndex].likes) {
      return;
    }

    const likeArray = allPosts[postIndex].likes;
    const userIndex = likeArray.findIndex((l) => l.userId == userId);
    if (userIndex == -1) {
      return;
    }
    likeArray.splice(userIndex, 1);
    return allPosts[postIndex];
  }
}
