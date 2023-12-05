let id = 1;
export default class PostsModel {
  //* Constructor
  constructor(_postURL, _postDesc, _postLocation, _userId) {
    this.id = id++;
    this.userId = _userId;
    this.postURL = _postURL;
    this.postDesc = _postDesc;
    this.postLocation = _postLocation;
    this.postDate = new Date().toLocaleDateString();
    this.postTime = new Date().toLocaleTimeString();
    this.update = false;
  }

  //* For New Post
  static new(postDesc, postLocation, postURL, userId) {
    const post = new PostsModel(postURL, postDesc, postLocation, userId);
    postsData.push(post);
    return post;
  }

  //* Get All Post for Specific User
  static getAll(userId) {
    return postsData.filter((p) => p.userId == userId);
  }

  //* Get Specific post for  Specific User
  static getOne(postId, userId) {
    return postsData.find((p) => p.id == postId && p.userId == userId);
  }

  //* Update a Post
  static update(postId, postDesc, postLocation, userId) {
    const index = postsData.findIndex(
      (p) => p.id == postId && p.userId == userId
    );
    if (index == -1) {
      return;
    }
    let updatedPost = {};

    if (postDesc) {
      updatedPost.postDesc = postDesc;
    }

    if (postLocation) {
      updatedPost.postLocation = postLocation;
    }

    updatedPost.update = {
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
    };
    const update = Object.assign(postsData[index], updatedPost);
    return update;
  }

  //* Delete post By Id
  static delete(postId, userId) {
    const index = postsData.findIndex((p) => p.id == postId);
    if (index == -1) {
      return;
    }

    postsData.splice(index, 1);
    return this.getAll(userId);
  }
}

var postsData = [
  new PostsModel(
    "./uploads/painting-mountain-lake-with-mountain-background_188544-9126.avif",
    "Description 1",
    "Gurgao Delhi",
    1
  ),
  new PostsModel(
    "./uploads/istockphoto-636379014-612x612.jpg",
    "Description 2",
    "Kota Rajasthan",
    1
  ),
];
