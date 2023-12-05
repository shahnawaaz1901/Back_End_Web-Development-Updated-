import ApplicationError from "../error/application.error.js";
import LikesModel from "./likes.model.js";

export default class LikesController {
  addLikeToPost(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.add(postId, userId);
    if (!result.success) {
      throw new ApplicationError(result.msg, 404);
    }
    res.status(200).send(result.msg);
  }

  removeLikeToPost(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.remove(postId, userId);
    if (!result.success) {
      throw new ApplicationError(result.msg, 404);
    } else {
      res.status(200).send(result.msg);
    }
  }

  getPostLikes(req, res) {
    const { postId } = req.params;
    const userId = req.userId;
    const result = LikesModel.get(postId, userId);
    if (!result.success) {
      throw new ApplicationError(result.msg, 404);
    } else {
      return res.status(200).send(result.data);
    }
  }
}
