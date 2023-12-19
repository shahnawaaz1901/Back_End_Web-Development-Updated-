import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  addLike(req, res) {}

  removeLike(req, res) {}
}
