import { ObjectId } from "mongodb";
import mongoose, { Schema, mongo } from "mongoose";

export const cartSchema = new Schema({
  /*
        Instead of import ObjectId to use we can directly use by writing schema.types keyword
        productId : ObjectId, 
    */
  productId: {
    /*
        Because our product Id reffers to a Document which is in another collection so we need to specify that collection in ref so that properly we can reffers to id to that collection 
    */
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  quantity: Number,
});
