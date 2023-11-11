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

const connectToMongoDB = () => {
  /* 
        MongoClient Class connect function returns to us a promise because 
        this is a asynchronous function 
    */
  MongoClient.connect(url)
  
    .then((client) =>
      console.log(`Mongo DB is Connected Successfully !! : ${client}`)
    )
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
};

//* Export function to use in Our main index file

export default connectToMongoDB;
