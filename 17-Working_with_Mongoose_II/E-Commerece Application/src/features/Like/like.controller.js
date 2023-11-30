import ApplicationError from "../errorHandler/application.error.js";
import LikeRepository from "./like.repository.js";

export default class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }

  async likeItem(req, res) {
    try {
      const { userId } = req;
      const { itemId, type } = req.body;
      /* 
        If user gives us incorrect type so we need to check before call 
        the repository 
      */
      if (type != "Product" && type != "Category") {
        return res.status(400).send("Like Type is Invalid ");
      }

      if (type == "Product") {
        await this.likeRepository.likeProducts(itemId, userId);
      } else {
        await this.likeRepository.likeCategory(itemId, userId);
      }
      res.status(201).send("Liked Successfully !!");
    } catch (error) {
      console.log(error);
      res.status(500).send("Something Went Wrong");
    }
  }

  async getLikes(req, res) {
    try {
      console.log(req.query)
      const { itemId, type } = req.query;
      console.log(itemId, type)
      const likeData = await this.likeRepository.getLikeItem(itemId, type);
      res.status(200).send(likeData);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Something went Wrong While Connecting to Database")
    }
  }
}
