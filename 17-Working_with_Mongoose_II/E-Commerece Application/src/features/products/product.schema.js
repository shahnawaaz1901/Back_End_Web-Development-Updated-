import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  stock: Number,
  /* 
    Because our one product can have multiple reviews so that we can say 
    product is one to many relationship with the reviews because every product
    have array of ratings not a single rating so that we can specify this is
    one to many relationship from product to ratings  
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
  /* 
    One poruct also have the array of categories not a single category so this is also
    indicates the one to many relationship between product and categories, because both
    side have relationship of one to many so this indicates the many to many relationship 
  */
  categories: [
    {
      type: mongoose.Types.ObjectId,
      ref: "category",
    },
  ],
});
