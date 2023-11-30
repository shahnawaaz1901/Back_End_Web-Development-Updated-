import ApplicationError from "../errorHandler/application.error.js";
import OrderModel from "./order.model.js";
import { ObjectId } from "mongodb";
import { getDB, getClient } from "../../config/mongodb.js";
/* 
  Mongoclient help us to Create the Session for the Transaction
*/

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      // Start the Transaction at the Start of function
      const db = getDB();
      session.startTransaction();
      //1. Get the Cart Items and Calculate the Ammount
      const items = await this.totalAmount(userId, session);

      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      //2. Create an Order Record

      const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount);
      await db.collection(this.collection).insertOne(newOrder, { session });

      //3. Reduce the Stock
      for (let item of items) {
        /* 
          Update the stock because user is purchased items so reduce the stock 
        */
        await db.collection("products").updateOne(
          { _id: item.productId },
          {
            // Increment operator increase the value because we give nagative value so it substract the value
            $inc: {
              stock: -item.quantity,
            },
          },
          { session }
        );
      }
      //4. Clear the Cart Items
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });

      // record data for every transaction into the database
      session.commitTransaction();

      // End the Session Which We Start at the time of Start of the function
      session.endSession();
      return;
    } catch (error) {
      // We Need to Abort the transaction if Any Occurs because if any error occurs before the line 79 then session and transaction never stopped
      await session.abortTransaction(); // abortTransaction cancel the Transaction and Rolledback the changes
      session.endSession();
      console.log(error);
      throw new ApplicationError("Something Went wrong", 500);
    }
  }

  async totalAmount(userId, session) {
    const db = getDB();

    const items = await db
      .collection("cartItems")
      .aggregate(
        [
          // 1. Get the Cart Items from the user
          {
            // If We Store userId in MongoDB Object format then we need to convert it into MongoDB Object
            // Like this $match : {userId : new ObjectId(userId)}
            $match: { userId: new ObjectId(userId) }, // Retreive the All Product for the User
          },

          // 2. Get the Products from the Products Collection Based on Product Id
          {
            $lookup: {
              from: "products", // Specify Collection Name which we want to search the document
              localField: "productId", // In cart we store product id as name of productId
              foreignField: "_id", // In products collection which name we use to store the product id because we use deault mongoDB _id for product so we specify the _id
              as: "productInfo", // Specify name where we store the products information
            },
          },

          // 3. unwind the productInfo array into the Object
          {
            $unwind: "$productInfo",
          },

          // 4. Add Total Amount in productInfo
          {
            $addFields: {
              totalAmount: {
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ],
        { session }
      )
      .toArray();
    return items;
  }
}
