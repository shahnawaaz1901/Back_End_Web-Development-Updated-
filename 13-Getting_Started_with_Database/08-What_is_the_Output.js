/*
MongoDB Update Outcome

What will be the Output of the Following commands when they are executed within the 'employees' collection .?

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
2. It will update the salary of the first matching employee to 90000.
3. It will not update the salary of any employee.
4. It will throw an error.
*/