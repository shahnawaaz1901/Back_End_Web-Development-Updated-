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
      await collection.insertOne(productObject);
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
}
