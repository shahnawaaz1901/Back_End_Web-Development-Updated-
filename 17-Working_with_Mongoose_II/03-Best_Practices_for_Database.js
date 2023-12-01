/*
    These are the points for best practices into the Database : 
    
    1. Schema Design : 
        Two Types of Schema Exist One is Flat and another one is Nested Schema.
        
        Flat Schema : When we create schema like in our products schema we create 
                an attribute review which points to review collection but we do not 
                store the whole review schema we just create review document in the 
                review collection and whatever id database gives to that document in 
                the collection we just store that document id into the reviews array 
                and specify collection name in ref attribute so that it points to that 
                document into that collection which ever we specify in the ref attribute, 
                this is called flat Schema. Flat Schema is very useful in huge level 
                applications.

        Nested Schema : we create products schema and review schema as well but instead 
                of storing the whole review document into the review array we just store 
                the document id that is flat schema but instead of this if we store the 
                whole document into a schema its called nested Schema means nesting of 
                two schemas. Its use only in small level application not used in complex
                applications
    
    2. Indexing : If applications uses the lot of queries on database then its a good idea
            to create index by using the attributes which defines in the Schema. But the 
            problem is too much indexing cause the performance issue, means if we create
            multiple indexes then it takes time to read the all indexes. It create write
            document to slower because the huge number of indexing on the database

    3. Error Handling : For Error Handling Create a Log file to keep track where error is
            introduced so it helps developers to identify errors on the application, and
            we need try catch block for proper error handling. This blocks Helps us to
            run the application always if some error is occure. Always write try catch
            when you do database related operations

    4. Validations : Validation we can do with API and also on the database level validation 
            using the mongoose because before storing the data into the database its good 
            that we first verify its correct data or not. Because we can't believe on the 
            user because user can send anything its our responsibility to verify the data 
            before storing into the database 
*/
