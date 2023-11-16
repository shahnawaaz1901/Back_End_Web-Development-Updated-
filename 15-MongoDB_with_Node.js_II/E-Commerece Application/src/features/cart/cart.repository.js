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
      /* 
        Instead of Directly Added Items into the Cart we Need to first Check
        If item is exist on cart for that user or not. If item not added prev
        for the User in the cart then we need to directly added the item into
        the cart and Insert New Document for the Cart into the Database
        So instead of Directly Adding New Object
      await collection.insertOne(productObject);
      */
      /* 
        specify the upsert value to true if Our filter find the Product then 
        it will update the product and if Our Filter Not Found the Product 
        then it will Insert the Product so both Check and Insert work done By 
        our updateOne function  
        */
      collection.updateOne(
        {
          //* Filter
          productId: productObject.productId,
          userId: productObject.userId,
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
      /* For Return the Updated Value of Document 
      {
        returnNewDocument : true
      }
      */
    );
    /* 
      We Want the Document before the update so that we get the document after 
      that we return the value for give the Id 
    */
    return resultDoc.value;
  }
}
