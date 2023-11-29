import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import ApplicationError from "../errorHandler/application.error.js";
import mongoose, { mongo } from "mongoose";
import { productSchema } from "./product.schema.js";
import { reviewSchema } from "./product.review.schema.js";
import { categorySchema } from "./category.schema.js";

//* Create Product and Review Model using mongoose
/* 
  Model take two argument one is collection name and another one is shcema 
  which we use to give the structure of document into the collection
*/
const ProductModel = mongoose.model("products", productSchema);
const ReviewModel = mongoose.model("review", reviewSchema);
const CategoryModel = mongoose.model("category", categorySchema);

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }

  async add(product) {
    try {
      //* 1. Add the Product
      const productData = new ProductModel(product); // Create Instance of Model

      const saveProduct = await productData.save(); // Push the Product Inside database

      //2. Update the Categories into the Product
      /* 
        We Are go to Every Category and in every category add the Product Id and 
        and reffer to that product 
      */
      console.log(saveProduct);
      await CategoryModel.updateMany(
        {
          /* 
            in Operator working with the array where in operator goes for every element of the 
            productData.categories because in product Schema we added the categories in the form
            of Object Id so we go to that category id and add the product to that category object,
            because one product can have multiple categories then we need to update the all the 
            categories which product belongs
          */
          /* 
            We can understand like this that in operator iterate over the array like for of loop 
          */
          _id: { $in: productData.categories }, // Filter
        },
        {
          $push: { products: new ObjectId(saveProduct._id) },
        }
      );
      return saveProduct;
      /*
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(product);
      return product;
      */
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Somethin Went Wrong", 500);
    }
  }

  async getAll() {
    try {
      const products = await ProductModel.find().toArray();
      // const db = getDB();
      // const collection = db.collection(this.collection);
      // await collection.find().toArray();
      return products;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async getOne(id) {
    try {
      return await ProductModel.findById(id);
      // const db = getDB();
      // const collection = db.collection(this.collection);
      // return await collection.findOne({
      //   _id: new ObjectId(id),
      // }); /* Create ObjectId Object using new keyword */
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
      /* 
        Fro Modifying Received document in Database we need to use projection Operator
        Projection Operator works byDefault in two ways one is Inclusion and Another One
        is Exclusion. We need to Sepcify fields in project function which we want to get
        and set the value of field is 1 so that we want to include the field in that document
        if we Not Specify the _id then id is bydefault sent if We dont want the id then
        we need to exlude the _id field by specifying the value to 0.
      */
      const filterData = await collection
        .find(filterConditions)
        .project({
          _id: 0,
          name: 1,
          price: 1,
          // _id : 0                              //* If Dont Want to Send the Id
          /* 
            slice keyword number is the document which we want to receive for in Our case 
            we want only 1 Document from ratings array so that we specify $slice value to 1
            if field which we want to slice is not present then it not return anything about
            that field
          */
          ratings: { $slice: 1 },
          /* 
            if We want to get the Last Document of the Field then we need to specify value -1
            to return the last document in that fields Array

            ratings : {$slice : -1}
          */
        })
        .toArray();
      return filterData;
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong", 500);
    }
  }

  async rate(userObject) {
    try {
      /* Code using Mongoose */
      // find the Product
      const productToUpdate = await ProductModel.findById(userObject.productId);
      if (!productToUpdate) {
        throw new Error("Product not Found");
      }

      // Check if Review Exist for this user Or Not
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(userObject.productId),
        user: new ObjectId(userObject.userId),
      });

      // If User rated already then update Rating
      if (userReview) {
        (userReview.rating = userObject.rating), await userReview.save();
      } else {
        // Create new Rating
        const newReview = new ReviewModel({
          product: new ObjectId(userObject.productId),
          user: new ObjectId(userObject.userId),
          rating: userObject.rating,
        });
        await newReview.save();
      }
      /* Older Code using direct mongodb
      const { userId, productId, rating } = userObject;
      const db = getDB();
      const collection = db.collection(this.collection);
      Step 1 Remove the Existing Entry for the User
      await collection.updateOne(
        { _id: new ObjectId(productId) },
        {
          $pull: {
            //* Pull remove the data from the product which satisfy the Condition just write after the pull operator
            ratings: { userId: new ObjectId(userId) },
          },
        }
      );

      Step 2 Add the New Entry for the User
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
      );*/
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something went Wrong ", 500);
    }
  }

  async avgPrice() {
    try {
      const db = getDB();

      return await db
        .collection(this.collection)
        .aggregate([
          // Stage 1 : Get Average Price per Category
          {
            $group: {
              _id: "$category",
              averagePrice: {
                // Store the All Category Average Price
                //* avg Operator return average of the Numeric Values Excluding the Non-Numeric Values
                $avg: "$price", //* Specify the field by using the dollar before and put it in string which we want to average
              },
            },
          },
        ])
        .toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async avgRatings() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.aggregate([
        // Stage 1 : unwind the ratings array into the Object
        {
          $unwind: "$ratings",
        },

        //Stage 2 : Group the Rating for Each Product
        {
          $group: {
            _id: "$ratings",
            averageRatings: {
              $avg: "$ratings.rating",
            },
          },
        },
      ]);
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }

  async countOfRating() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.aggregate([
        {
          // Stage 1 : Project Name of the Product and Count of ratings

          $project: {
            name: 1,

            $cond: {
              if: { $isArray: "$ratings" },
              then: {
                /* Returns the size of ratings array */
                countOfRating: { $size: "$ratings" },
              },
              else: 0,
            },
          },
        },
        {
          // Stage 2 : Sort the Collection Which We Receive After Stage 1 in Acesending and Descending Order
          /* value of countOfRating if 1 then we want to sort in ascending Order otherwise in -1 we want to sort within descending Order */
          $sort: { countOfRating: -1 }, // Because we want to Sort Based On countOfRatings and want that highest Raating is On Top
        },
        {
          // Stage 3 : We want to Return Only One Which is Highest so we put limit
          $limit: 1, // We Want Only One Document which is highest countOfRating
        },
      ]);
    } catch (error) {
      throw new ApplicationError("Something Went Wrong", 500);
    }
  }
}
