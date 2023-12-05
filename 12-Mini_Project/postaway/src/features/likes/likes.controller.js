import LikesModel from "./likes.model.js";

export default class LikesController {
  addLikeToPost(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.add(postId, userId);
    if (!result.success) {
      return res.status(404).send(result.msg);
    }
    res.status(200).send(result.msg);
  }

  removeLikeToPost(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.remove(postId, userId);
    if (!result.success) {
      res.status(404).send(result.msg);
    } else {
      res.status(200).send(result.msg);
    }
  }

  getPostLikes(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    console.log(postId, userId)
    const result = LikesModel.get(postId, userId);
    if (!result.success) {
      return res.status(404).send(result.msg);
    } else {
      return res.status(200).send(result.data);
    }
  }
}
