/* Best Way to retrieve posts

You are building a REST API for a social media platform. Which of the following 
URL structures is recommend to retrieve all posts by a specific user .?

1. api/posts/get-by-use
2. api/user/posts                                   //* Correct
3. api/posts/user
4. api/user/get-posts

Solution Description : Using "api/user/posts" follows the convention of using 
                noun to represent resources and heirarchical relationships.
*/

/* Significance of Status Code

What is the Significance of using correct status codes in a REST API .?

1. It enhance security measures
2. It improves naming conventions
3. It provides detailed information about the request's status.             //* Correct
4. It enhance UI design

Solution Description : Using Correct Status Codes in a REST API provides detailed
            information about the status of the request to users, making the API 
            more user friendly.
*/

/*  Importance of Validating Data

Why is it Important to validate Data before sending it to an API function .?

1. To perform data encryption
2. To enhance UI Design
3. To improve naming conventions
4. To prevent potenstial security vulnerbilities.           //* Correct

Solution Description : Validating Data helps prevent Security vulnerbilities 
            such as SQL Injection and enhances the overall security of the Appilcation.
*/

/*  Extracting the userID

How can the user ID be extracted from the 'api/user/123456' format, where 
123456 represents the userID, within an Express Request handler for an API endpoint .? 

1.
app.get('/api/user/:userId', (req, res)=>{
    const userId = req.query.userId
})
2.
app.get('/api/user/:userId', (req, res)=>{
    const userId = req.body.userId
})
3.
app.get('/api/user/:userId', (req, res)=>{                  //* Correct
    const userId = req.params.userId
})
4.
app.get('/api/user/:userId', (req, res)=>{
    const userId = req.param.userId
})

Solution Description : In Express, for the API Endpoint 'api/user/123456' is the 
                    user ID, you can correctly retrieve the user ID using 
                    req.params.userId. This is because req.params captures values 
                    from the URL Path, specifically the 'userId' we define route. 
                    Avoid using req.query.userId(for query parameters), 
                    req.body.userId (for Request Body), or req.param.userId (invalid 
                    syntax) as they are not suitable for this task.

*/