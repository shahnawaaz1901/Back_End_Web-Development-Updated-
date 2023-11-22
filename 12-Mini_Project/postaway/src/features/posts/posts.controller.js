import PostsModel from "./posts.model.js";
export default class PostsController {
  //* Create New Post
  createPost(req, res) {
    const { postDesc, postLocation } = req.body;
    let postURL;
    if (req.file) {
      postURL = req.file.path;
    }

    const newPost = PostsModel.new(postDesc, postLocation, postURL, req.userId);
    return res.status(201).send(newPost);
  }

  //* Retrieve All Posts
  getAllPosts(req, res) {
    return res.status(200).send(PostsModel.getAll(req.userId));
  }

  //* Get Post For Specific Id
  getOnePost(req, res) {
    const result = PostsModel.getOne(req.params.postId, req.userId);
    if (!result) {
      return res.status(404).send("Posts Not Found");
    }
    return res.status(200).send(result);
  }

  //* Update the Post
  updatePost(req, res) {
    const { postId } = req.params;
    const { postDesc, postLocation } = req.body;
    const updatedPost = PostsModel.update(
      postId,
      postDesc,
      postLocation,
      req.userId
    );
    if (!updatedPost) {
      return res.status(404).send("Post Not Found !!");
    }

    res.status(200).send(updatedPost);
  }

  //* Delete the Post
  deletePost(req, res) {
    const { postId } = req.params;
    const result = PostsModel.delete(postId, req.userId);
    if (!result) {
      return res.status(404).send("Post Not Found");
    }
    return res.status(200).send(result);
  }
}
