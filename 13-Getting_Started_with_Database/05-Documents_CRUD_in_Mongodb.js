/* 
    We Can DO CRUD Operations Via our Terminal using Terminal Commands mongosh
    helps us to do CRUD Operations Via terminal by using the commands

    For CRUD operations using commandline we need to use mongoDB shell which is
    also installed along with mongoDB which location is program files mongoDB 
    inside mongoDB mongosh folder where mongosh software is there if we run then
    we are connected to same mongoDB server on same port which is default for 
    mongoDB we also directly open the command line and type mongosh to start the
    command and connect to mongoDB default server
    
    for show all database in our mongo DB we write "show dbs" command.

    For Create or switch database we need to write "use" keyword and after that
    we write the name of database like this for create database of books we need
    to write keyword "use bookDB".
    
    If we write again "show dbs" to check all database then bookDB not showing because
    withOut any Collection database can't be seen.

    For Create Collection there is no direct command to create collection but if we enter
    a document using collection then collection will be automatically created like we create
    databse using "use bookDB"

    For add Document on the books We Need to Pass Command 
    "db.books.insertOne({name : "Ashu Ansari", year : 2001, Author : "Shahnawaaz Ansari" })"
    
    //* insertOne is a function which expect a JSON Data from us
    
    When we press enter to insert the data then we get an JSON Object in Commandline which
    contains status of our data and if data is inserted successfully then gives us id which
    name is insertedId which is actually mongoDB object id which mongoDB gives when an object
    is created into the database.

    //* Id which mongoDB provide to an object is globally unique means this id not is unique in 
    //* the world but how its possible, its possible because this is a 12 bytes id which is generated
    //* in 12 bytes start 4 bytes is timestamp which is unique then next 5 bytes is machine details
    //* which created with the help of machine id and machine address and rest three bytes is counter
    //* with Combining all the details this gives a uniqueness to the Id. 

    For Showing collection we need to write "show collections", this command will gives us all the
    collection which is inside that database. For access this command show collections we need to
    first choose the database which we can do using the "use bookDB" command.

    for insertmany objects or documents into the collections we need to use function command 
    "db.books.insertMany" which function require an array of objects to insert many document 
    into the collection

    for get All document from the collection we need to use command "db.books.find()" which is
    works as here db for database books is collection which documents we want to get and if we 
    pass nothing in find function then we get all documents into which is inside the that collection
    
    If we want to find One book based on some condition then we need to pass condition into the
    find function in and object form where key is in which parameter you want to search like in 
    our case we want to find by the title so we need to pass an object which key is title and
    value is value of name which we want to find so that command is db.books.findOne({title : "Ashu Ansari"})
    but findOne function returns us only one value which is came first in our database like css selector
    in DOM in JavaScript. if We want to find Out all data which match with our Search then we need
    to use command "db.books.find({title : "Ashu Ansari"})"
*/