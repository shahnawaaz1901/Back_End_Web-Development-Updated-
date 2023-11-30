import mongoose, { Schema } from "mongoose";

/* 
    Because our Review Schema Reffers to two different Collection into same 
    database. Our Review is a single schema but our review schema use multiple
    collection reference so we can that this is a one to many relationship 
*/
export const reviewSchema = new Schema({
  product: {
    type: mongoose.Types.ObjectId, // Type of Product because we reffer to products using the productID
    ref: "products", // Reffer to the Collection
    require: true, // Field is Mendatory
  },
  user: {
    type: mongoose.Types.ObjectId, // Type of User because we reffer to User using the UserID
    ref: "users", // Reffer to the Collection
    require: true, // Field is Mendatory
  },
  comment: String,
  rating: Number,
});
