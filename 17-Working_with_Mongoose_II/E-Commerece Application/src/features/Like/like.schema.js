import mongoose, { mongo } from "mongoose";

export const likeSchema = new mongoose.Schema({
  /* Storing useId which like the Product or Category */
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  /* 
        We can't Directly Specify the Product and Category attribute because 
        if user Like the Product then we need to reffer the to the product
        collection or if user like the category then we need to reffer to 
        the category collection so we use word likeable which can't specify
        a product or category. In likeable we store the type which is id because
        product and category both have id. because we dont know user like the 
        product or category so that so we cant directly reffer to a specific
        collection so we need a keyword which we use to define another attribute
        which is enum which decide in which collection we want to store the document
        and the collection name is string so that we specify the type which is string
    */
  likeable: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: "on_model", // on_model is string which we need to create as seprate attribute
  },
  on_model: {
    type: String,
    enum: ["products", "categories"],
    required: true,
  },
});
