import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
export default class CartRepository {
  constructor() {
    this.collection = "cartItems";
  }
  async add(productObject) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      //* For Get the Id
      const id = await this.getNextCounter(db);
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
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find({ userId }).toArray();
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async delete(requireObject) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.deleteOne(requireObject);
    } catch (error) {
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  //* Create getNextCounter Function To get the id for the for the Cart and
  async getNextCounter(db) {
    const resultDoc = await db.collection("counters").findOneAndUpdate(
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
      }

    );
    /* 
      We Want the Document before the update so that we get the document after 
      that we return the value for give the Id 
    */
    return resultDoc.value;
  }
}
