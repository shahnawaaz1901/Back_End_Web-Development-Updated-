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

/*
  In a Huge Dictionary if we Search a word for the meaning in the Dictionary
  then we should't find the word directly One by One by searching the word in
  each page. For Efficient Searching We See a page where All Words Start Word
  is mentioned along with its page number. So that we match first character of
  word which we want to search and find the page number of that character , so
  that we can go to that page and searching that word and easily find the word.
  First We Search first Character of our word in the index page so that we get
  the page number for that character. This save our lot of time and work, similarly
  we can do this type of indexing in Our database so that if Any Query User Raised
  We can Search the Document effifciently in Our Database. This save lot of time
  to search document in the database and response quickly by comparing to search
  withOut Indexing of database
  
  we can createIndex by giving the command :

  db.collection("collection_name").createIndex()

  We Can Create the Index by accending Order or Decsending Order we can also create
  the text indexing means we can give indexing in the text format.

  By Adding the Indexing Our read Operations becomes faster But every time when we
  insert the document we need to perform extra work by creating the index for the
  document so we can say our write operations become comparatively slower then before
*/