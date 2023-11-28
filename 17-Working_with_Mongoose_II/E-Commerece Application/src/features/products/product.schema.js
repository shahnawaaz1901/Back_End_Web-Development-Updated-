import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  stock: Number,
  /* 
    Because our one product can have multiple reviews so that we can say 
    product is one to many relationship with the reviews
    */
  // Because rating can be multiple so that we need an array to store the rating
  rating: [
    // array contains an object to store the user Id wo define object
    {
      // For Storing the document id of Review Collection
      type: mongoose.Types.ObjectId,
      ref: "reviews",
    },
  ],
  category: [
    {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  ],
});
