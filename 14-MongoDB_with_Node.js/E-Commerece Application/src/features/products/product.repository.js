import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(product) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(product);
      return product;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Somethin Went Wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      /*
        if We Directly Search with the id in database we cant findOut because id
        which we provide is string but id which mongoDb gives to a document is
        ObjectId so that we need to convert first Id into Object id using the contructor
        function which provide by mongoDB 
        return await collection.findOne({_id : id});
      */
      return await collection.findOne({ _id: new ObjectId(id) });   /* Create ObjectId Object using new keyword */
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong ", 500);
    }
  }
}
