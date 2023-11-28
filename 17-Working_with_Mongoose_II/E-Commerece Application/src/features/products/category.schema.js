import mongoose from "mongoose";

export const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  products: [
    {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
  ],
});
