import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async addLike(req, res) {
    const likeData = await this.likeRepository.add(req.body);
  }

  async removeLike(req, res) {}
}
