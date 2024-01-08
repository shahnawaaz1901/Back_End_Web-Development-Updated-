import ApplicationError from "../error/error.class.js";
import LikeRepository from "./likes.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async addLike(req, res, next) {
    try {
      const { userId } = req;
      const { id, type } = req.body;
      console.log(id, type);
      if (!id || !type) {
        throw new ApplicationError("Please Provide Required details", 406);
      }
      if (type != "Post" && type != "User" && type != "Comment") {
        throw new ApplicationError("Type is Invalid", 406);
      }
      const likeData = await this.likeRepository.add({ ...req.body, userId });
      res.status(201).json({ success: true, likeable: likeData });
    } catch (error) {
      console.log("Inside Controller !!");
      next(error);
    }
  }

  async removeLike(req, res, next) {
    try {
      const { userId } = req;
      const { likeId } = req.params;
      const { likeableDataId, type } = req.body;
      if (!likeableDataId || !type || !likeId) {
        throw new ApplicationError("Please Provide Require Details !!", 406);
      }
      if (type != "Post" && type != "User" && type != "Comment") {
        throw new ApplicationError("Type is Invalid !!", 406);
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
      next(error);
    }
  }
}
