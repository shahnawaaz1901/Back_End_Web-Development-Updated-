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
      /*
        if We Directly Search with the id in database we cant findOut because id
        which we provide is string but id which mongoDb gives to a document is
        ObjectId so that we need to convert first Id into Object id using the contructor
        function which provide by mongoDB 
        return await collection.findOne({_id : id});
      */
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
      /* 
        We need to Create filter conditions Object we Can't Pass Directly 
        Filter Conditions Object because in some cases user provide us 
        maximum or Minimum or category in that condition we couldn't findOut 
        the products in the database so thats why first we need to check if 
        User is provided data or not and if and if user provide the data then 
        we use that data in Our filterCondition Object as Attribute of Object   
      */
      let filterConditions = {};
      //* gte means greater then equal to
      if (minPrice) {
        filterConditions.price = { $gte: parseFloat(minPrice) };
      }
      //* lte means less then equal to
      if (maxPrice) {
        /* 
          if we Directly Write this statement then this Statement Override 
          the minPrice Statement filterConditions.price = { $lte: parseFloat(maxPrice) }; 
        */
        /* 
          So Instead of Writing Directly maxPrice We Need to Write Some Extra 
          Information so that we values of price not Overriden 
        */
        filterConditions.price = {
          ...filterConditions.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterConditions.category = category;
      }
      /* 
        Here Also We Expect Products More then one so We need to convert all 
        data into the Array and after that return the array of products  
      */
      const filterData = await collection.find(filterConditions).toArray();
      return filterData;
    } catch (error) {
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  async rate(userObject) {
    try {
      const { userId, productId, rating } = userObject;
      const db = getDB();
      const collection = db.collection(this.collection);
      /* 
        For Insert a Rating Array we need to Use $push keyword which is basically 
        used to insert the array in the Object or update the Value of Object, Here 
        we use the push keyword to push array data in the Object 
      */
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $push: {
            ratings: {
              userId : new ObjectId(userId),
              rating,
            },
          },
        }
      );
    } catch (error) {
      throw new ApplicationError("Something went Wrong ", 500);
    }
  }
}
