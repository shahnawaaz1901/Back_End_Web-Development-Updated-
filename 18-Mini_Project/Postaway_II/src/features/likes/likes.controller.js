import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async addLike(req, res) {
    try {
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
    } catch (error) {
      console.log(error);
    }
  }

  async removeLike(req, res) {
    try {
      const { userId } = req;
      const { likeId } = req.params;
      const { likeableDataId, type } = req.body;
      if (!likeableDataId || !type || !likeId) {
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
      res
        .status(200)
        .send({ success: true, message: "Like Removed successfully !!" });
    } catch (error) {
      console.log(error);
    }
  }
}
