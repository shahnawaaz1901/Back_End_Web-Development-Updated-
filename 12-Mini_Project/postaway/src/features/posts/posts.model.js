let id = 1;
export default class PostsModel {
  //* Constructor
  constructor(_postURL, _postDesc, _postLocation) {
    this.id = id++;
    this.postURL = _postURL;
    this.postDesc = _postDesc;
    this.postLocation = _postLocation;
    this.postDate = new Date().toLocaleDateString();
    this.postTime = new Date().toLocaleTimeString();
  }

  static new(postDesc, postLocation, postURL) {
    const post = new PostsModel(postURL, postDesc, postLocation);
    postsData.push(post);
    return post;
  }

  static getAll() {
    return postsData;
  }

  static getOne(id) {
    return postsData.find((p) => p.id == id);
  }

  static update(id, postDesc, postLocation, postURL) {
    const index = postsData.findIndex((p) => p.id == id);
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

    const update = Object.assign(postsData[index], updatedPost);
    return update;
  }

  static delete(id) {
    const index = postsData.findIndex((p) => p.id == id);
    if (index == -1) {
      return;
    }

    postsData.splice(index, 1);
    return this.getAll();
  }
}

var postsData = [];
