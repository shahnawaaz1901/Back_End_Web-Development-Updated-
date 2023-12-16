import PostRepository from "./posts.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  createPost(req, res) {}

  getPosts(req, res) {}

  getOnePost(req, res) {}

  updatePost(req, res) {}

  deletePost(req, res) {}
}
