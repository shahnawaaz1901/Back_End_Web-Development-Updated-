//* import MongoClient Class from mongodb
import { MongoClient } from "mongodb";

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(process.env.DB_URL)
    .then((clientInstance) => {
      client = clientInstance;
      console.log(`Mongo DB is Connected Successfully !! `);
      createCounter(client.db());
      /* 
        We Want to give the Indexing when Our MongoDB server is Connected 
        so that we need to call the indexing function after our Mongo DB 
        is Connected 
      */
      createIndexes(client.db());
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

/*
  By Default MongoDB gives the indexing for the document in the form of _id, Which
  makes the query faster because we search a document in database by the id which's
  index 
*/

const createIndexes = async (db) => {
  //! Note : All the Attributes in Object which we pass in createIndex function should be present in the document
  // price is the attribute name which we want to use in Indexing
  try {
    //* Because we give Only One Field then this is called Single field Indexes
    await db.collection("products").createIndex({ price: 1 });
    console.log("Indexes is Created !!");

    /* 
      For Creating the Compounding Indexes we need to Specify More then One 
      Field in which One can be Acsending and Another can be in Descending or 
      Both Are Same. We can also gives Multiple Indexing for the One Collection
    */

    await db.collection("products").createIndex({ name: 1, category: -1 });
    /*
      In Above we give compound Indexing because we specify more then one attribute
      in Our createIndex function. name is in Acesending Order and Category in the
      descending Order.
    */

    /* 
        In Large Application where Our database have multiple collection we can 
        give the indexing in the form of text. Usually a Product Description is
        longer so we can give the indexing in the form of text
      */
    await db.collection("products").createIndex({ description: "text" });
  } catch (error) {
    console.log(error);
  }
  /*
    Value of 1 specify that we want to give the indexing in acsending Order
    value of -1 specify that we want to give the indexing in descending Order
  */
};
