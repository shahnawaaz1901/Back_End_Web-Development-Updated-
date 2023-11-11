/*
MongoDB Update Outcome

What will be the Output of the Following commands when they are executed 
within the 'employees' collection .?

db.employees.find()

{
    "_id" : "....",
    "name" : "John Doe",
    "position" : "Software Engineer",
    "salary" : 70000,
}
{
    "_id" : "....",
    "name" : "John Smith",
    "position" : "Product Manager",
    "salary" : 70000,
}
{
    "_id" : "....",
    "name" : "Alice Johnson",
    "position" : "Data Scientist",
    "salary" : 70000,
}

db.employees.updateOne({salary : 70000}, {$set : {salary : 90000}})


1. It will update the salary of all employees to 90000.
2. It will update the salary of the first matching employee to 90000.       //* Correct
3. It will not update the salary of any employee.
4. It will throw an error.

Solution Description : The updateOne() method in mongoDB finds the first 
    document in the collection that matches a specified filter and updates that 
    document. Here, the filter is (salary : 7000), so it finds the first document 
    where the salary is 70000. The $set operation (salary : 90000) then updates 
    the salary of this first matching document to 90000.
*/

/*
MongoDB Delete OutCome

What will be the Output of the following command when it is executed within 
the 'users' collection .?

db.users.deleteMany({})


1. It will not delete any users from the collection.
2. It will delete all the users from the collection.                                //* Correct
3. It will not execute because the deleteMany() method has an empty filter object.
4. It will throw an error.

Solution Description : The deleteMany function in MongoDB deletes all document 
        that match a provided filter. In this case, the filter is {} (an empty Object), 
        which matches all document in the collection. Thus, when db.users.deleteMany({}) 
        is executed within the 'users' collection, it will delete all document in the collection
*/