import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
/* 
  MongoDB have Operators to Find Our the Data By Comparing the Values 
  of Attribute of Document. Given the name of Operators Corresponding
  to working or Description 

  $eq - Matches values that are equal to a specified value.

  $gt - Matches values that are greater than a specified value.

  $gte - Matches values that are greater than or equal to a specified value.

  $in - Matches any of the values specified in an array.

  $lt - Matches values that are less than a specified value.

  $lte - Matches values that are less than or equal to a specified value.

  $ne - Matches all values that are not equal to a specified value.

  $nin - Matches none of the values specified in an array.
*/

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
      return await collection.findOne({
        _id: new ObjectId(id),
      }); /* Create ObjectId Object using new keyword */
    } catch (error) {
      console.log(error);
      throw new ApplicationError(
        "Something Went Wrong While Finding In Database",
        500
      );
    }
  }

  async filter(filterConditions) {
    const { minPrice, maxPrice, category } = filterConditions;
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterConditions = {};
      //* gte means greater then equal to
      if (minPrice) {
        filterConditions.price = { $gte: parseFloat(minPrice) };
      }
      //* lte means less then equal to
      if (maxPrice) {
        filterConditions.price = {
          ...filterConditions.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterConditions.category = category;
      }

      const filterData = await collection.find(filterConditions).toArray();
      return filterData;
    } catch (error) {
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  async rate(userObject) {
    try {
      console.log(userObject);
      const { userId, productId, rating } = userObject;
      const db = getDB();
      const collection = db.collection(this.collection);
      /* 
        In Some Cases One User Gives Ratings Multiple Times for a Product 
        so Instead of Adding new Rating Object we need to update the existing 
        rating, So doing this we need first to findOut the Product by the id
        then we need to check if ratings array is exist or not for that object
        if array is exist then we need to search if user is rated this product
        previously or not, if User Exist then we need to update the rating.
        If ratings array is not exist then we first need to create rating array
        for that object after that create rating object for that user and after 
        that push the rating object to the ratings array.
      */
      //*1. Find the Product
      const product = await collection.findOne({
        _id: new ObjectId(productId),
      });

      //*2. Find the Rating
      /* 
        Quesion mark is null check if product or ratings not found then dont do
        next operation it prevents error which is occur for access null properties
      */
      const existRating = product?.ratings?.find((r) => r.userId == userId);
      if (existRating) {
        //* 3. Update the Existing Rating
        await collection.updateOne(
          {
            _id: new ObjectId(productId),           //* First Finding the Product
            "ratings.userId": new ObjectId(userId), //* The finding the ratings array in Product
          },
          {
            $set: {
              //* If ratings is found then replace the existing user rating
              // dollar placeholder gives us the first found Object in product
              "ratings.$.rating": rating,
            },
          }
        );
      } else {
        await collection.updateOne(
          { _id: new ObjectId(productId) },
          {
            $push: {
              ratings: {
                userId: new ObjectId(userId),
                rating,
              },
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong ", 500);
    }
  }
}
