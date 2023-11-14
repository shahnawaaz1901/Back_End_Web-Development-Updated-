let id = 1;
export default class PostsModel {
  //* Constructor
  constructor(_id, _postURL, _postDesc, _postLocation) {
    this.id = id++;
    this.postURL = _postURL;
    this.postDesc = _postDesc;
    this.postLocation = _postLocation;
    this.postDate = new Date().toLocaleDateString();
    this.postTime = new Date().toLocaleTimeString();
  }

  static new() {}

  static get() {}

  static getOne() {}

  static update() {}

  static delete() {}
}

var postsData = [];