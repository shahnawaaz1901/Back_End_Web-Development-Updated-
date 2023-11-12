/*
Accessing MongDB Database

Conside the following code snippet in a Node.Js application 

const url = "mongodb://127.0.0.1:27017/

let client;
export const connectToMongoDB = () => {
  MongoClient.connect(url)
    .then(
      (clientInstance) => {
        client = clientInstance;
        console.log(`Mongo DB is Connected Successfully !! `);
      }
    )
    .catch((err) =>
      console.log(`Error while Connecting with Database : ${err}`)
    );
}

How can you access the 'logs' database from th above implementation .?


1. const getLogsDB = () => client.db("logs");               //* Correct
2. const getLogsDB = () => client.db();
3. const getLogsDB = () => client.getDatabase("logs");
4. const getLogsDB = () => MongoClient.db("logs");

Solution Description : The Correct way to access a specific database after 
                connecting to a MongoDB server using the Node.js MongoDB 
                driver is by invoking the db method on the client instance 
                and passing the name of the database as an argument. 
                This method is correctly demonstrated in the first option.
*/
