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
        on_model: "Product",
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
        on_model: "Category", //on_model points to the collection, so we need to write correct collection name
      });
      await newLike.save();
    } catch (error) {
      console.log("Inside", error);
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }

  async getLikeItem(id, type) {
    /* 
      populate function populate attribute with its actual document. What the
      mean by the actual document in cart or like repository instead of storing
      the whole user or product document we store just object id and specify the
      collection value in ref in which object id belongs to.
      WhatEver attribute value we provide in populate function it goes to that
      attribute value after that goes to the collection which attribute value
      belongs to and gives us the whole document
    */
    return await LikeModel.find({ likeable: new ObjectId(id), on_model: type })
      /* 
        We Directly Write user because user have direct reference to User Collection
        But in likeable we specify that goes to that attribute and we need to specify
        another attibute model which takes the collection name which that id belongs
        to because we use the refPath attribute instead of ref so that we need to 
        specify the path to poin to that collection which we want to point
      */
      .populate("user")
      .populate({ path: "likeable", model: type });
  }
}
