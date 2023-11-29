import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  /* 
    Because category have array of products ,not a single product so this indicates 
    the one to many relationship and same as in products every product can have the 
    array of categories not a single category so this is also one to many so both
    side one to many indicates the many to many relationships
  */
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
});
