/*
    Middlewares : Middlewares Works as Pipeline Where Request passed form 
            one middleware function to other middleware function and Also 
            it allows us to change or modify the request and and corresponding 
            to the request return the response to the server
*/

/*
    Middlewares in Mongoose : Middlewares can access the request and modify 
            the request same kind of theory applied for the mongoose where
            middleware exist in the form of hooks which is actually middleware
            but works differently in the mongoose database. There are two type
            hooks exist in the mongoose "PreHooks" and "PostHooks" both hooks
            are act like a middleware but we can understand both are different
            because one is use before and one is work after. Middleware applied
            in the database operation like before doing the database operation 
            and after doing the database operation these are the difference 
            between the pre and post hooks.

    *Note : Middlewares are Only Available on the mongoose version more then 3.0
*/

/*
    Mongoose have 4 types of Middlewares :
    1. Document Middleware
    2. Aggregate Middleware
    3. Query Middleware
    4. Model Middleware

    Basis on these Operations we decide which middleware apply for the operation.

    1. Document Middleware : in the Document related operations in database we 
                apply the these pre and post hooks as functions that functions
                are below :

                I. validate
                II. save
                III. remove
                IV. updateOne
                V. deleteOn
                VI. init (Synchronous Hook)
        
    2. Query Middleware : Query Middleware applies when we get the something from 
                the database. there are multiple functions available which we use 
                to get the data from the database. pre and post hooks for the query
                middlewares below :

                I. count
                II. countDocument
                III. deleteMany
                IV. deleteOne
                V. estimatedDocumentCount
                VI. find
                VII. findOne
                VIII. findOneAndDelete
                IX. findOneAndRemove
                X. findOneAndReplace
                XI. findOneAndUpdate
                XII. remove
                XIII. replaceOne
                XIV. update
                XV. updateOne
                XVI. updarteMany
                XVII. validate
        
    3. Aggregate Middleware : Aggregate Middleware allows to use pre and post 
                hooks operation inside the aggregate function. Which use the 
                aggregation pipeline to modify the response, multiple Stages 
                of pipeline is called 

    4. Model Middleware : In Model middleware pre and post hooks operation done 
                by the insertMany function 
*/

/* 
    We can apply pre hook operation by specifying the pre function which takes
    two arguments which first is the operation( like : save, validate ) where 
    we want to apply this hooks and next is the callback which is called before 
    the operation is done and after the callback we can call the next function 
    which goes for next function in the pipeline like normal middleware where 
    we call the next function which taken care to send the request to the next 
    middleware in the pipeline.
*/

/*
    We can also apply the post hook like the pre hooks where we call the function 
    of post and in this function it also takes the two argument one is operation 
    and another one is callback. Callback function is called only after the operation 
    which we specify is the completed 
*/