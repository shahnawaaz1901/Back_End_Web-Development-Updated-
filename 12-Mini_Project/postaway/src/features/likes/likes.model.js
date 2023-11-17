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
    console.log("Inside the Removen function")
    let allPosts = PostsModel.getAll(userId);
    const postIndex = allPosts.findIndex(
      (f) => postId == f.id && userId == f.userId
    );
    console.log("Before postIndex Condition");
    if (postIndex == -1) {
      console.log("Inside the postIndex");
      return;
    }
    console.log("After postIndex Condition");
    // console.log(allPosts[postIndex]);
    if (!allPosts[postIndex].likes) {
      allPosts[postIndex].likes = [];
    }
    console.log("After Likes Array Creation");
    const userIndex = allPosts[postIndex].likes.findIndex((u) => {
      u.userId == userId;
    });
    console.log("After the Iterate the array " + userIndex);
    for (let every of allPosts[postIndex].likes) {
      console.log(every, "In Loop");
    }

    if (userIndex == -1) {
      return;
    }

    allPosts[postIndex].likes.splice(userIndex, 1);
    return allPosts[postIndex];
  }
}
