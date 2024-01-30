import mongoose from "mongoose";
// import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
import { cartSchema } from "./cart.schema.js";
import CounterSchema from "./counter.schema.js";

const CartModel = mongoose.model("Cart", cartSchema);
const CounterModel = mongoose.model("Counter", CounterSchema);

export default class CartRepository {
  async add(cartObject) {
    try {
      const id = await this.getNextCounter().value;
      return await CartModel.updateOne(
        {
          userId: new mongoose.Types.ObjectId(cartObject.userId),
          productId: new mongoose.Types.ObjectId(cartObject.productId),
        },
        {
          $setOnInsert: {
            _id: id,
          },
          $inc: {
            quantity: cartObject.quantity,
          },
        },
        { upsert: true }
      );
    } catch (err) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async get(userId) {
    try {
      return await CartModel.find({
        userId: new mongoose.Types.ObjectId(userId),
      });
    } catch (error) {
      throw new ApplicationError("Something Went Wrong with Database", 500);
    }
  }

  async delete(requireObject) {
    try {
      return await CartModel.deleteOne(requireObject);
    } catch (error) {
      throw new ApplicationError("Something went Wrong with Database", 500);
    }
  }

  //* Create getNextCounter Function To get the id for the for the Cart and
  async getNextCounter() {
    const resultDoc = await CounterModel.findOneAndUpdate(
      {
        _id: "cartItemId", //* Filter
      },
      {
        $inc: {
          //* Increment the Value for nextId
          value: 1,
        },
      },
      //* For Return the Existing Document We Need pass an Object Defining returnDocument Value "after"
      {
        returnDocument: "after",
        upsert: true,
      }
    );
    return resultDoc;
  }
  /*
      We Want the Document before the update so that we get the document after
      that we return the value for give the Id
    */
}
