import PostRepository from "./posts.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(req, res) {
    console.log(req.file);
    let name;
    if (req.file) {
      name = req.file.filename;
    }
    const post = await this.postRepository.new({
      data: req.body,
      user: req.userId,
      imageURL: name,
    });
    res.status(200).send(post);
  }

  getPosts(req, res) {}

  getOnePost(req, res) {}

  updatePost(req, res) {}

  deletePost(req, res) {}
}
