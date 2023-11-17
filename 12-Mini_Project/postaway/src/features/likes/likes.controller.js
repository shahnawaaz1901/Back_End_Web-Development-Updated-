import LikesModel from "./likes.model.js";

export default class LikesController {
  addLikeToPost(req, res) {
    const postId = req.params.postId;
    const userId = req.userId;
    const result = LikesModel.add(postId, userId);
    console.log(result);
    if (!result) {
      return res.status(404).send("Post Not Found !!");
    }
    res.status(200).send(result);
  }

  removeLikeToPost(req, res) {
    const postId = req.params.userId;
    const userId = req.userId;
    LikesModel.remove(postId, userId);
    res.status(200).send("Likes Remove Successfully !!");
  }
}
