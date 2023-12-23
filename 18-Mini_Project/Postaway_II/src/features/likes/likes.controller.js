import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async addLike(req, res) {
    const { userId } = req;
    const { id, type } = req.body;
    console.log(id, type);
    if (!id || !type) {
      return res
        .status(406)
        .json({ success: false, message: "Please Provide Required details" });
    }
    if (type != "Post" && type != "User" && type != "Comment") {
      return res
        .status(406)
        .json({ success: false, message: "Type is Invalid" });
    }
    const likeData = await this.likeRepository.add({ ...req.body, userId });
    res.status(201).json({ success: true, likeable: likeData });
  }

  async removeLike(req, res) {
    const { userId } = req;
    const { likeId } = req.params;
    const { likeableDataId, type } = req.body;
    if (!id || !type || !likeId) {
      return res
        .status(406)
        .json({ success: false, message: "Please Provide Required details" });
    }
    if (type != "Post" && type != "User" && type != "Comment") {
      return res
        .status(406)
        .json({ success: false, message: "Type is Invalid" });
    }
    const removeLike = await this.likeRepository.remove({
      userId,
      likeId,
      likeableDataId,
      type,
    });
  }
}
