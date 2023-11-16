//* import MongoClient Class from mongodb
import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log(`Mongo DB is Connected Successfully !! `);
      createCounter(client.db());
    })
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
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
