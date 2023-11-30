import mongoose, { Schema } from "mongoose";

/* 
  * One to One Relationship with the Product
  Cart is Directly Relate to One Product even though the quantity of product
  can vary but the product is same so that we can directly say that cart is
  one to one relationship with the product
*/

export const cartSchema = new Schema({
  /*
        Instead of import ObjectId to use we can directly use by writing schema.types 
        keyword
        productId : ObjectId, 
    */
  productId: {
    /*
        Because our product Id reffers to a Document which is in another collection so 
        we need to specify that collection in ref so that properly we can reffers to id 
        to that collection 
    */
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  quantity: Number,
});
