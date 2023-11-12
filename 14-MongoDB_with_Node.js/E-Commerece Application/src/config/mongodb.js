//* import MongoClient Class from mongodb
import { MongoClient } from "mongodb";

/* 
    Client needs to Know which database url we Trying to Connect in Our case 
    url is localhost but in real world application url will be cloud based database
    url  
*/
// const url = "mongodb://localhost:27017/";

/* 
    Along with url we also need to tell which database we are trying to connect, we
    know that in mongoDB multiple database we can create so that we need to specify in
    mongoDB which database we want to connect
*/
//* Actual URL After adding Database Name is :
//* In Some Cases url name localhost thrown errors so we need to pass actual ip instead of localhost */
const url = "mongodb://127.0.0.1:27017/ecomDB"; //* This is Complete URL Contains database type which is mongoDb and next is which is the URL of Database and which database we want to connect

/* 
    In Cloud based Databases along with these three things we also need to specify the
    username and password to authenticate like this

    mongodb+srv://myDatabaseUser:D1fficultP%40ssw0rd@mongodb0.example.com/?authSource=admin&replicaSet=myRepl
*/

//* For Connect to mongoDB
let client;
export const connectToMongoDB = () => {
  /* 
        MongoClient Class connect function returns to us a promise because 
        this is a asynchronous function 
    */
  MongoClient.connect(url)

    .then(
      /* 
        If Database is Connected Successfully then we get an Object 
        which contains properties of Database 
      */
      (clientInstance) => {
        client = clientInstance;
        console.log(`Mongo DB is Connected Successfully !! `);
      }
    )
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
};

//* Export database for doing user related operation
/* 
  If we want any database related operation then first we need to call our 
  getDB function then remain task will be done 
*/
export const getDB = () => {
  /* 
    We Store the clientInstance in Client Variable. Clien Instance Contain 
    multiple Properties including the db, which helps us to do database related
    operations. when we return client.db function this function takes an argument
    in string which is the name of database, because we already provide the name
    in the url then we dont need to provide name of database here. If we not provide
    database name in url then its mandatory that we provide name in db function 
  */
  
  return client.db();
};

//* Export function to use in Our main index file
/* Because We Export Multiple functions then we need to remove default keyword and directly export at the function expression*/
// export default connectToMongoDB;
