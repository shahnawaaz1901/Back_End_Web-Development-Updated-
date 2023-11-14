import { getDB } from "../../config/mongodb.js";
export default class ProductRepository {
  async addProduct(product) {
    try {
      const db = getDB();
      const collection = db.collection("products");
      await collection.insertOne(product);
      return product;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {}

  async getProductById(id) {}
}
