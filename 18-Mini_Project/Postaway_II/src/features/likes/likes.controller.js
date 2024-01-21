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
      if (!id) {
        throw new ApplicationError("Incorrect id", 406);
      }
      if (type != "Post" && type != "User" && type != "Comment") {
        throw new ApplicationError("Type is Invalid", 406);
      }
      const likeData = await this.likeRepository.add({ ...req.body, userId });
      res.status(201).json({ success: true, likeId: likeData.upsertedId });
    } catch (error) {
      next(error);
    }
  }

  async removeLike(req, res, next) {
    try {
      const { userId } = req;
      const { likeId } = req.params;
      if (!likeId) {
        throw new ApplicationError("Please Provide LikeId !!", 406);
      }

      const result = await this.likeRepository.remove({
        userId,
        likeId,
      });
      res.status(200).send({ success: true, message: result });
    } catch (error) {
      next(error);
    }
  }

  async getLikes(req, res, next) {
    try {
      const { id, type } = req.query;

      if (!id) {
        throw new ApplicationError("Likeable Item Id Can't be Empty", 406);
      }
      if (type != "Post" && type != "User" && type != "Comment") {
        throw new ApplicationError("Invalid Type", 406);
      }

      const likesData = await this.likeRepository.get({ id, type });
      res.status(200).json({ sucess: true, likes: likesData });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
