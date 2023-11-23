import LikesModel from "./likes.model.js";

export default class LikesController {
  addLikeToPost(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;
    const result = LikesModel.add(postId, userId);
    if (!result) {
      return res.status(404).send("Post Not Found !!");
    }
    res.status(200).send(result);
  }

  removeLikeToPost(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.remove(postId, userId);
    if (result instanceof LikesModel) {
      return res.status(200).send(result);
    }
    res.status(404).send(result);
  }

  getAllLikes(req, res) {
    const userId = req.userId;
    const result = LikesModel.getAll(userId);
    res.status(200).send(result);
  }
}
