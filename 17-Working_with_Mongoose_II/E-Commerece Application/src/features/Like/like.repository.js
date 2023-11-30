import mongoose, { mongo } from "mongoose";
import { likeSchema } from "./like.schema.js";
import { ObjectId } from "mongodb";
import ApplicationError from "../errorHandler/application.error.js";

// Create Model for Database Related Operations
const LikeModel = mongoose.model("likes", likeSchema);

export default class LikeRepository {
  // Like the Product
  async likeProducts(productId, userId) {
    try {
      /* Create Instance of Model */
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        /* 
          likeable attribute we specify because we dont know which thing 
          product or category user like, its define by the user at the runtime
          so we use the attribute likeable instead of product or category
          which we can say combine keyword for both
        */
        likeable: new ObjectId(productId),
        on_model: "products",
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
        on_model: "categories",         //on_model points to the collection, so we need to write correct collection name
      });
      await newLike.save();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }
}
