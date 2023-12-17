import PostRepository from "./posts.repository.js";

export default class PostController {
  constructor() {
    this.postRepository = new PostRepository();
  }

  async createPost(req, res) {
    /* Because if user not upload any image then req.file value is undefined */
    if (req.file) {
      req.body.imageURL = req.file.filename;
    }

    if (req.body.tags) {
      req.body.tags = req.body.tags.split(",");
    }

    const savedPost = await this.postRepository.new({
      user: req.userId,
      caption: req.body.caption,
      imageURL: req.body.imageURL,
      location: req.body.location,
      timeStamp: new Date().toString(),
    });
    return res.status(201).send("Data");
  }

  getPosts(req, res) {}

  getOnePost(req, res) {}

  updatePost(req, res) {}

  deletePost(req, res) {}
}
