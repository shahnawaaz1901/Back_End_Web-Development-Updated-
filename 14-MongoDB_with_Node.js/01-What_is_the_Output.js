/*
MongoDB Interaction

What does the MongoDB driver allow you to do in a Node.js application .?

1. Host a MongoDB database on a local machine.
2. Connect a NodeJS application to a MongoDB client.
3. Connect a NodeJS application to a MongoDB server.            //* Correct
4. Transform the data from a MongoDB database to an XML format.

Solution Description : The Primary Purpose of the MongoDB Driver in a Node.Js 
                application is to faciliate the connection between the application 
                and a mongoDB server. This allows the Node.Js application to interact 
                with the database.
*/

/*
MongoDB connection Function

How can the MongoDB driver be used to connect to a MongoDB database on a local 
machine .? ( Multiple )

A.
const url = 'mongodb://localhost:27017'

const connectToDB = ()=>{
    MongoClient.connect(url)
        .then((client)=>{console.log("Connect to DB .!!")})
        .catch((err)=>{console.log(err)})
}

B.
const url = 'mongodb://localhost:27017'

const connectToDB = async ()=>{
    try{
        await MongoClient.connect(url)
        console.log("Connect to DB .!!");
    }catch(err){
        console.log(err);
    }
}

C. 
const url = 'mongodb://localhost:27017'

const connectToDB = ()=>{
    MongoClient.client(url)
        .then((client)=>{console.log("Connect to DB .!!")})
        .catch((err)=>{console.log(err)})
}

D.
const url = 'mongodb://localhost:27017'

const connectToDB = async ()=>{
    try{
        await MongoClient.open(url)
        console.log("Connect to DB .!!");
    }catch(err){
        console.log(err);
    }
}



1. A                                    //* Correct
2. B                                    //* Correct
3. C
4. D

Solution Description : The Corect way to connect to a MongoDB Database on a local 
            machine using the MongoDB driver for Node.Js is gives in options A and B. 
            The other options are using non-existing methods (like MongoClient.client 
            and MongoClient.open which doesn't exist in the MongoDB Node.js Driver )
*/
