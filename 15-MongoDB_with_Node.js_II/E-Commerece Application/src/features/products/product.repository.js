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

  /* 
    Aggregation Pipeline takes the request perform some action on from the 
    database and gives us an insight
  */

  /* 
    In our case we can get insight like avarage price and average rating this
    we'll do by the aggregation pipeline. Below we so same thing for we perform
    some action and get the average price for every category we can do this for 
    other field as well
  */
  async avgPrice() {
    try {
      const db = getDB();
      /* 
        When Ever we want the some insight in a Collection from Database then we
        can use the find function but it's recommend to use the aggregate pipeline
        to get the insight based on some field. Because we dont want to change something
        in database instead of database we want to see avg price on returning side so
        we need to do operations on return side. We Need to call the aggregate function
        on the collection and perform some operation in that function 
      */
      /* 
        Aggregation Pipeline not Moodify the document until passs the merge and out 
        operator . Aggregate function takes array of different Stages . Stages are used
        to filter Out the data 
      */
      return await db
        .collection(this.collection)
        .aggregate([
          // Stage 1 : Get Average Price per Category
          /* 
          Here we use the group operator, group operator seprates the document into the 
          groups according to a group key which we specify as operator in the group operator 
        */ {
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
          /* 
            We use Project because we find the maximum number of ratings document
            but in document we send only nessesory document like name of the product
            and Number of Ratings in of that Product along with we also want to send
            id because if somebody want the product after looking the maximum number
            of rating that's why we keep the id of the product
          */
          $project: {
            name: 1,
            /* 
              Sometime ratings array is not available in the product document so instead 
              of direct passing the size we need to first check after the checking if the 
              array is present then we use the size operator, for this we need to add an
              if else condition in the if ratings array is present then check the size and
              if ratings array undefined or null then we specify the size of array to 0.
              for conditions we use the operator "$cond", "$isArray" is the operator. "$size"
              operator return the size of array
            */
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
