import mongoose from "mongoose";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
import { cartSchema } from "./cart.schema.js";
import CounterSchema from "./counter.schema.js";

const CartModel = mongoose.model("Cart", cartSchema);
const CounterModel = mongoose.model("Counter", CounterSchema);

export default class CartRepository {
  async add(cartObject) {
    try {
      const newCartItem = new CartModel({
        userId: new mongoose.Types.ObjectId(cartObject.userId),
        productId: new mongoose.Types.ObjectId(cartObject.productId),
        quantity: cartObject.quantity,
      });
      await newCartItem.save()
      //* For Get the Id
      // const id = await this.getNextCounter(db);
      collection.updateOne(
        {
          //* Filter
          // We Need to Give MongoDB ObjectId form for product id so we can easily findOut the product from cart to product collection
          productId: new ObjectId(productObject.productId),
          userId: new ObjectId(productObject.userId),
        },
        {
          //* Means id is Only Given if Document is Created id is not given if document is updated
          $setOnInsert: {
            _id: id,
          },
          //* Increment Operator use to Increment or Decrement the Value of Quantity in Our Cart
          $inc: {
            quantity: productObject.quantity,
          },
        },
        {
          upsert: true,
        }
      );
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async get(userId) {
    try {
      return await CartModel.find({
        userId: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }

  async delete(requireObject) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.deleteOne(requireObject);
    } catch (error) {
      throw new ApplicationError("Something went Wrong with Database", 500);
    }
  }

  //* Create getNextCounter Function To get the id for the for the Cart and
  // async getNextCounter(db) {
  //   const resultDoc = await db.collection("counters").findOneAndUpdate(
  //     {
  //       _id: "cartItemId", //* Filter
  //     },
  //     {
  //       $inc: {
  //         //* Increment the Value for nextId
  //         value: 1,
  //       },
  //     },
  //     //* For Return the Existing Document We Need pass an Object Defining returnDocument Value "after"
  //     {
  //       returnDocument: "after",
  //     }
  //   );
  //   /* 
  //     We Want the Document before the update so that we get the document after 
  //     that we return the value for give the Id 
  //   */
  //   return resultDoc.value;
  // }
}
