import PostsModel from "./posts.model.js";
export default class PostsController {
  //* Create New Post
  createPost(req, res) {
    const { postDesc, postLocation } = req.body;
    const postURL = req.file.filename;
    const newPost = PostsModel.new(postDesc, postLocation, postURL);
    return res.status(201).send(newPost);
  }

  //* Retrieve All Posts
  getAllPosts(req, res) {
    return res.status(200).send(PostsModel.getAll());
  }

  getOnePost(req, res) {
    const result = PostsModel.getOne(req.params.id);
    if (!result) {
      return res.status(400).send("Posts Not Found");
    }
    return res.status(200).send(result);
  }

  updatePost(req, res) {
    const id = req.params.id;
    const { postDesc, postLocation } = req.body;
    const postURL = req.file.filename;
    const updatedPost = PostsModel.update(id, postDesc, postLocation, postURL);
    if (!updatedPost) {
      return res.status(400).send("Post Not Found !!");
    }

    res.status(200).send(updatedPost);
  }

  deletePost(req, res) {}
}
