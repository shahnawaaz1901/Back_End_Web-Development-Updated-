import { ObjectId } from "mongodb";
import { getDB, getClient } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
import OrderModel from "./order.model.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
    /* 
            for Orderes We use the transactions in Database because in Database
            we Need to Perform Multiple Operations as a single Operation so that
            if Any operation is failed Due to Some Reason We Don't want to process
            Next Operations and we need to undo all changes which we did in database.
            In transactions We combined Multiple Set of operations such as that all
            operations like as One Transaction so if Any Operation failed Due to some
            Reason Transactions help us revert back all the stages which we done during
            the transactions 
        */
  }

  async placeOrder(userId) {
    try {
      //1. Get the Cart Items and Calculate the Ammount
      const items = await this.totalAmount(userId);
      /* 
        Reduce function takes callback function which first arguments is accumulator
        next is array which we used to calculate the sum, 0 is for starting value of
        the total because start value is 0 because we want only calculate the price
        for which is in cart so we provide 0 as initial value
      */
      const finalTotalAmount = items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );
      //2. Create an Order Record
      const newOrder = new OrderModel(new ObjectId(userId), finalTotalAmount);
      const db = getDB();
      await db.collection(this.collection).insertOne(newOrder);
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
          }
        );
      }
      //4. Clear the Cart Items
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) });
    } catch (error) {
      console.log(error);
    }
  }

  async totalAmount(userId) {
    try {
      /* 
        Product in Our Cart Items not Contain the Whole information About the Product but
        contains the information like userId and product Id which helps us to get the product
        Id from the cart collection and go to products collection fetch the the product info 
        by the productId Now Calculate the total Amount by multiply the quantity which is in
        our cart by the product Value and add all Product Quantity Amount into final amount
        and return the amount
      */

      const db = getDB();
      const collection = db.collection("cartItems"); // Because first we need to search Only product which is in the Cart
      /* 
        Because we lookup the Whole Products which is in our Database that's why we need
        to use the aggregate pipeline get the products with the Ammount which is calculate
        through the product quantity of cart
      */
      const items = await collection
        .aggregate([
          // 1. Get the Cart Items from the user
          {
            // If We Store userId in MongoDB Object format then we need to convert it into MongoDB Object
            // Like this $match : {userId : new ObjectId(userId)}
            $match: { userId }, // Retreive the All Product for the User
          },

          // 2. Get the Products from the Products Collection Based on Product Id
          {
            $lookup: {
              from: "products", // Specify Collection Name which we want to search the document
              foreignField: "_id", // In products collection which name we use to store the product id because we use deault mongoDB _id for product so we specify the _id
              localField: "productId", // In cart we store product id as name of productId
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
                // Because price is part of productInfo which is array previously After that we unwind into object so we access productInfo Obejct Price because quantity is part of cartItems Collection so we can directly access quantity
                $multiply: ["$productInfo.price", "$quantity"],
              },
            },
          },
        ])
        .toArray();
      // 5. Add Total Ammoun in the Final Object

      //Because we need whole array to reduce the items in inventory that's why we return the whole array
      return items;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong", 500);
    }
  }
}
