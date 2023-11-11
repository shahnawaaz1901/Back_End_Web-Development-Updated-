/*
Data Management Operations

Which of the following are data management Operations .? ( Multiple )

1. Storing, updating and deleting data in a database.                       //* Correct
2. Backing up data to an external storage device.                           //* Correct
3. Performing data validation to ensure data integrity.                     //* Correct
4. Retrieving data from a web API.                                          //* Correct

Solution Description : Storing, updating and deleting data in a database. backing up data 
                to an external storage device, performing data validation to ensure data 
                intergity, and retreiving data from a web API are all examples of data 
                management operations.
*/

/*
Relational vs. Non-relational Database Differences

Which of the following statements accurately represents the difference between 
relational and non-relational databases.?
1. Non-relational databases offer flexibility in data storage whereas               //* Correct
    relational databases have strict schemas.
2. Relational databases are typically faster and provide better performance
    for handling large-scale data than non-relational databases.
3. Non-relational databases are less predictable due to unstructured data           //* Correct
    as compared to relational databases.
4. Relational databases store data in JSON format whereas non-relational 
    databases use the row-column format.

Solution Description : Non-relational databases provide flexibility in data storage 
                due to the absence of strict schemas, and are less predictable than 
                relational databases. The often offer superior performance on large 
                scale data. Also, they can store data in formats like JSON, whereas 
                relational databases use a row-column format.
*/

/*
MongoDB Birth Year Query

What MongoDB command(s) should be used to retrieve all users born in the year 2000, 
considering that the birth year is stored as a numerical 'dob' attribute .? ( Multiple )

A. db.users.find(dob = 2000)
B. db.users.find({dob : 2000})
C. db.users.find({'dob' : 2000})
D. db.users.find({dob : '2000'})

1. A
2. B                                                //* Correct
3. C                                                //* Correct
4. D

Solution Description : The correct commands for retrieving all users born in 2000, 
                with the birth year stored in a 'dob' attribute, are 
                db.users.find({dob : 2000}) and db.users.find({'dob' : 2000}). 
                These MongoDB commands correctly match the 'dob' attribute to the 
                value 2000. The other options incorrect because they either mismatch 
                the data type by using a string instead of a number or use an incorrect 
                syntax for the query. 

*/

/*
updateOne() vs replaceOne()

What is the difference between the updateOne() and replaceOne() method .?


1. updateOne() and replaceOne() both always update all fields in a document.
2. replaceOne() replaces the entire document, while updateOne() modifies only           //* Correct
    specified fields of a document.                           
3. updateOne() replaces the entire document, while replaceOne() modifies only 
    specified fields of a document.
4. None of the above.

Solution Description : updateOne() and replaceOne() are both used for updating 
                documents in MongoDB. However, updateOne() modifies specific fields 
                in the document using operators like $set. On the other hand, 
                replaceOne() replaces an existing document entirely with a new document. 
*/

/*
Order Deletion Command

Imagine you are woking with a MongoDB database that has a collection called 'orders'. 
You need to remove a particular order document identified by the order number '12345'. 
How would you formulate the appriopriate command in the MongoDB shell to achieve this .?

A. db.orders.delete({orderNumber : '12345'})
B. db.orders.delete({orderNumber : '123'})
C. db.orders.findAndDelete({orderNumber : '12345'})  
A. db.orders.deleteOne({orderNumber : '12345'})

1. A
2. B
3. C
4. D                                                //* Correct

Solution Description : The Correct Command to delete a single entry from the database, 
                specifically an order document with the ID '12345', is 
                db.orders.deleteOne({orderNumber : '12345'}). Upon locating the matching 
                entry, it removes the repective order document from the 'orders' collection
*/

/*
MongoSB Price Update Command

Which MongoDB command , along with the appropriate operator, can be used to 
simultaneously update the 'price' field for all electronic products .?

A. db.products.update({category : 'Electronics'}, {price : 499})
B. db.products.updateMany({category : 'Electronics'},{$set : {price : 499}})
C. db.products.update({price : 499}, {category : 'Electronics'})
D. db.products.updateMany({category : 'Electronics'},{$set : {price : 499}})


1. A
2. B                                                                //* Correct
3. C
4. D

Solution Description : The MongoDB command 
                db.products.updateMnay({category : 'Electronics'},{$set : {price : 499}}) 
                simultaneously updates the 'price' field for all electronics products in 
                the 'products' collection. The {category : 'Electronics'} filter targets 
                electronics products, and the $set operator modifies the 'price' field to 
                the new value of 499. This single command efficiently updates multiple 
                documents at once.
*/