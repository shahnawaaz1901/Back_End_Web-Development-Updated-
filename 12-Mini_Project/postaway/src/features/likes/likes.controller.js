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
    console.log(postId, userId);
    const result = LikesModel.remove(postId, userId);
    console.log(result, "After the Remove Function Called !!");
    if (!result) {
      return res.status(404).send("Post Not Found !!");
    }
    res.status(200).send(result);
  }
}
