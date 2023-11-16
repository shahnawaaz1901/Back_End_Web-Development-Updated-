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
  }

  static new(postDesc, postLocation, postURL, userId) {
    const post = new PostsModel(postURL, postDesc, postLocation, userId);
    postsData.push(post);
    console.log(postsData);
    return post;
  }

  static getAll(userId) {
    return postsData.filter((p) => p.userId == userId);
  }

  static getOne(id, userId) {
    return postsData.find((p) => p.id == id && p.userId == userId);
  }

  static update(id, postDesc, postLocation, postURL, userId) {
    const index = postsData.findIndex((p) => p.id == id && p.userId == userId);
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

    if (postURL) {
      updatedPost.postURL = postURL;
    }
    updatedPost.userId = userId;
    const update = Object.assign(postsData[index], updatedPost);
    return update;
  }

  static delete(id) {
    const index = postsData.findIndex((p) => p.id == id);
    if (index == -1) {
      return;
    }

    postsData.splice(index, 1);
    return postsData;
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
