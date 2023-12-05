import ApplicationError from "../error/application.error.js";
import PostsModel from "./posts.model.js";
export default class PostsController {
  //* Create New Post
  createPost(req, res) {
    const { postDesc, postLocation } = req.body;
    let postURL;
    if (req.file) {
      postURL = req.file.path;
    }

    if(!postDesc && !postLocation && !req.file){
      throw new ApplicationError("All Fields Can't be Empty", 406);
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
    if (result) {
      return res.status(200).send(result);
    }
    throw new ApplicationError("Post not found", 404);
  }

  //* Update the Post
  updatePost(req, res) {
    const { postId } = req.params;
    const { postDesc, postLocation } = req.body;

    if(!postDesc && !postLocation){
      throw new ApplicationError("Enter Valid Data for Update",406);
    }

    const updatedPost = PostsModel.update(
      postId,
      postDesc,
      postLocation,
      req.userId
    );
    if (!updatedPost) {
      throw new ApplicationError("Post not found.",404);
    }

    res.status(200).send(updatedPost);
  }

  //* Delete the Post
  deletePost(req, res) {
    const { postId } = req.params;
    const result = PostsModel.delete(postId, req.userId);
    if (!result) {
      throw new ApplicationError("Post not found",404);
    }
    return res.status(200).send(result);
  }
}
