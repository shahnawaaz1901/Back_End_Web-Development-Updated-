/*
Compound Index Creation

How Would you create a compound index in MongoDB using the createIndex() method .?


1. createIndex({ field1, field2 })
2. createIndex({ field1 }, { field2 })
3. createIndex({ field1: 1, field2: 1 })                        //* Correct
4. createIndex({ field1: 1 }, { field2: 1 })

Solution Description : The Correct Answer in option C. When Creating a 
                compound index in MongoDB using the createIndex() method, 
                you need to specify multiple fields and their respective 
                sorting orders within a single object. This helps MongoDB 
                optimize query performance by utilizing the index on both fields. 

*/

/*
Creating a Compound index with Custom Sorting

Your are building a library app with MongoDB. There's a 'books' 
collection with 'title' (text), 'author' (text), and 'publishedYear'(number). 
To speed up searches for books by title ad author, you need a special order. 
Books should be sorted by title(A-Z) and author(Z-A). What mongoDB Commands 
create this special order .?

1. db.books.createIndex({ title: 1, author: 1 })
2. db.books.createIndex({ title: 1 }, { author: -1 })
3. db.books.createIndex({ title: 1, author: -1 })               //* Correct
4. db.books.createIndex({ title: "text", author: "text" })

Solution Description : To create a compound index with different sorting orders 
                for different fields, you can provide an object for each field's 
                sorting order. In this case, to achieve the required sorting of 
                books by title in ascending order and by author in descending order, 
                you should use the command db.books.createIndex({title : 1, author : -1})
*/
