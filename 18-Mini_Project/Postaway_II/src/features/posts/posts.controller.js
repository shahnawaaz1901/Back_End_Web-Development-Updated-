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
      tags: req.body.tags,
    });
    return res.status(201).send(savedPost);
  }

  async getPosts(req, res) {
    let { userId } = req;
    //* If user want to see Other User's Post so User can do by Passing the Other UserId in Query Parameter
    if (req.query.userId) {
      userId = req.query.userId;
    }

    const posts = await this.postRepository.get(userId);
    res.status(200).send(posts);
  }

  async getOnePost(req, res) {
    const { postId } = req.params;
    const post = await this.postRepository.getOne(postId);
    return res.status(200).send(post);
  }

  updatePost(req, res) {}

  async deletePost(req, res) {
    const { userId } = req;
    const { postId } = req.params;
    await this.postRepository.delete({ userId, postId });
    res.status(200).send("Post Deleted Successfully !");
  }
}
