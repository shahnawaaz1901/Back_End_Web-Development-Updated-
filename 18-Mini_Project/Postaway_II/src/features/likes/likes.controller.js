import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async addLike(req, res) {
    const { id, type } = req.body;
    if (!id || !type) {
      return res
        .status(406)
        .json({ success: false, message: "Please Provide Required details" });
    }
    if (type != "Like" && type != "User" && type != "Comment") {
      return res
        .status(406)
        .json({ success: false, message: "Type is Invalid" });
    }
    const likeData = await this.likeRepository.add(req.body);
  }

  async removeLike(req, res) {}
}
