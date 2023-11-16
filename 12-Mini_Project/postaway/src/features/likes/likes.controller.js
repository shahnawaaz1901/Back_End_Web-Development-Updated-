import LikesModel from "./likes.model.js";

export default class LikesController {
  addLikeToPost(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;
    LikesModel.add(postId, userId);
    res.status(200).send("Likes Added Successfully..");
  }

  removeLikeToPost(req, res) {
    const postId = req.params.userId;
    const userId = req.userId;
    LikesModel.remove(postId, userId);
    res.status(200).send("Likes Remove Successfully !!")
  }
}
