//* import MongoClient Class from mongodb
import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log(`Mongo DB is Connected Successfully !! `);
      createCounter(client.db());
      createIndexes(client.db());
    })
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
};

// Return the Whole mongoDB client not just the Database
export const getClient = () => {
  return client;
};

export const getDB = () => {
  return client.db();
};

//* Create Counter for Giving the Id to the Cart
const createCounter = async (db) => {
  const existingCounter = await db
    .collection("counters")
    .findOne({ _id: "cartItemId" });
  if (!existingCounter) {
    await db.collection("counters").insertOne({ _id: "cartItemId", value: 0 });
  }
};

const createIndexes = async (db) => {
  //! Note : All the Attributes in Object which we pass in createIndex function should be present in the document
  // price is the attribute name which we want to use in Indexing
  try {
    //* Because we give Only One Field then this is called Single field Indexes
    await db.collection("products").createIndex({ price: 1 });
    console.log("Indexes is Created !!");

    await db.collection("products").createIndex({ name: 1, category: -1 });
    await db.collection("products").createIndex({ description: "text" });
  } catch (error) {
    console.log(error);
  }
  /*
    Value of 1 specify that we want to give the indexing in acsending Order
    value of -1 specify that we want to give the indexing in descending Order
  */
};
