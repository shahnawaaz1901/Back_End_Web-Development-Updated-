/* 
    Database : Database is tool or Software which allows us to store data inside it.
            Those data we can use in Our Application. We Can put every data inside 
            the database like in social media webpage user's data and user's post
            users friends list user's like or comments and much more we can store in
            to the database. All the Data related operations mainly CRUD is done by
            using the database 

    Different Kind of Databases :
    1. Relational Databse
    2. Objected Oriented Database
    3. NoSQL Database
    4. Heirarchical Database

    Relational and NoSQL Databases is the most Popular Databases in Current Scenario.
    Relational Database Lead in the database industry since databases is introduced
    for more then 3 decades. NoSQL Databases are newer compare to relational database

    Object Oriented Databases is database which stores data into the object format 
    and heirarchical database is works like tree data structures where user is root
    and other kind of information regarding the user stores as in the form of children
    node of root.
*/

/*
    Relational Databases : In relational databases we store data into the spreadsheet
                now question is what is spreadsheets. Spreadsheets is a excel file or
                google spreadsheet file where we store the data into the tables format.
                We can understand like in Relational Database we store data into the
                row and column format. Headers of Spreadsheet which define which kind 
                of data is present into that column is called as Schema. for an Example
                if We Store employee related data so that employee id, employee name ,
                employee salary is the schema and whatevery name, id and salary employee
                have is called the actual data. Schema is structure which represents how
                data stores.

    Why Relational Database : Suppose we have 2 databases one for employee and another
                is for department. in department database we specify different department
            and gives a specific key for every department. so that if we want to add
            department for employee then we dont need to add whole department data we
            just need to add a single key of department and link that department for the
            employee thats why its called relational database because we relate two databases.
            In our case department id is called primary key and but the department id which
            helps us to relate some other kind of database data is called foreign key.
*/

/*
    NoSQL Databases : NoSQL Database also called as schemaless database where we dont
            need schema. In this NoSQL databases we stores data into the JSON Format
            and in these kind of databases we use to store data into the unstructured
            or unpredective format. So this gives us more flexibility to store data
            inside the application. Purpose of NoSQL Database is store unstructured data
            into the database in this NoSQL Database we dont have any bouding that we
            only store this type of data or store this if we want then we store less
            data and if we want we can store large data as well

*/

/* 
    Comparison Between NoSQL and Relational Database

1. Relational Database has Strict Schema/Structure whether NoSQL Database has Schemaless.
2. Relational Database Stores Data into the Row Column Format but in NoSQL Database data
    is Stores into the JSON Format.
3. Due to schema Relational database can predict data but in NoSQL prediction of data 
    is no Possible.
4. in Relational Database its hard to read data with Large dataset and its hard to read
    relationships between two datasets whether in NoSQL Database its easy read in large
    data set and its also supports nesting for handle complex structure
5.  Relational Database : MySQL, Postgres, SQL Server
    NoSQL Database : MongoDB, Dynamic DB and CouchDB


*/