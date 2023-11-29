import mongoose, { mongo } from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../errorHandler/application.error.js";

const LikeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
  // Like the Product
  async likeProducts(productId, userId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        on_model: "Products",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }

  // Like the Category
  async likeCategory(categoryId, userId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        on_model: "Category",
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }
}
