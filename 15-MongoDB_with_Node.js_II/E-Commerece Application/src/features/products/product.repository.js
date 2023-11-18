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
    // let { minPrice, maxPrice, category } = filterConditions;
    let { minPrice, maxPrice, categories } = filterConditions;

    /* 
      MongoDB also provide us logical operator Like AND, OR, XOR. Internally
      When we use Pass multiple Conditions in the FindFunction MongoDB already
      used AND Operator Internally. This Operator We Can Also Use Explicitly By
      use the keyword "$and" and pass the array of conditions so that mongodb
      Only gives us result which matches the all conditions of Array. 
    */
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterConditions = {};
      // * gte means greater then equal to
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
      /* 
        Suppose that if We Want to Search for the product for Multiple Categories
        how Can we search product for the Multiple categories, We Can do by using
        the operator $in which take array of categories or fileds of Multiple Items 
      */
      categories = JSON.parse(categories.replace(/'/g, '"'));
      /* replace function use to replace the occurence g specify that we want to replace all the occurance  */
      /* Because categories is array expression in string so if we convert it into the JSON then it'll replace categories to array from string */
      if (categories.length) {
        filterConditions = {
          //* We Use the or oprator so we search based categories or we search on filterConditions because OR Operator Checks All the conditions 
          $or: [{ category: { $in: categories } }, filterConditions],
        };
      }
      /*
        Use of AND Operator in MONGO DB
        Supppose we Received Fix Two Argument minPrice and category from the User 
        and We Need to Find Out the product in database by using the coditions. But
        how can we use Logical Operator explicitly. Lets try :

        //* We Received Two Argument One is minPrice and Another One is category
        const conditions = {$and : [{price : {$gte : {parseFloat(miPrice)}}},{category : category}]}

        We Can use Logical Same it is in Other Conditions 
      */
      /*  We Can Implement the And operator like this : 
      But For use this filter object we need that user is give us all the three conditions
      That's Why we use previous filter where we check if user is given all conditions to
      us or Not
      

      We Can Use Minimum and Maximum Number Value if minPrice and maxPrice Not Given By the User
      if (!minPrice) {
        minPrice = Number.MIN_VALUE;
      }

      if (!maxPrice) {
        maxPrice = Number.MAX_VALUE;
      }

      Problem Occure in category if category is Not Define by the user then if We 
      give empty string then we couldn't findOut the products because it search for 
      empty string in category which is not available in Our database so Product Not 
      Found in this case
      if (!category) {
        category = "";
      }

      console.log(minPrice, maxPrice, category);
      const filter = {
        $and: [
          {
            category: category,
          },
          {
            price: {
              $gte: parseFloat(minPrice),
            },
          },
          {
            price: {
              $lte: parseFloat(maxPrice),
            },
          },
        ],
      };
      */
      const filterData = await collection.find(filterConditions).toArray();
      return filterData;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  async rate(userObject) {
    try {
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
      /* 
      Instead of first find the Product and inside the product find the ratings array
      and find the userId in the ratings array and after that update the user rating
      we can first remove the existing user in the ratings array using pull operator
      after that insert the new entry this can be done in 2 steps into first remove
      and second is insert new Rating
      
      1. Find the Product
      const product = await collection.findOne({
        _id: new ObjectId(productId),
      });

      //*2. Find the Rating
       
        Quesion mark is null check if product or ratings not found then dont do
        next operation it prevents error which is occur for access null properties

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
      }*/
      //* Simpler Approach for the Update or Add the New Rating
      // Step 1 Remove the Existing Entry for the User
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $pull: {
            //* Pull remove the data from the product which satisfy the Condition just write after the pull operator
            ratings: { userId: new ObjectId(userId) },
          },
        }
      );

      // Step 2 Add the New Entry for the User
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
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong ", 500);
    }
  }
}
