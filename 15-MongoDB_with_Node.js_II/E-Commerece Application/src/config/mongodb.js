//* import MongoClient Class from mongodb
import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then(
      (clientInstance) => {
        client = clientInstance;
        console.log(`Mongo DB is Connected Successfully !! `);
      }
    )
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
};


export const getDB = () => {  
  return client.db();
};
