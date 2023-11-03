/*
Purpose of CORS Policy

What is the Purpose of Cross Origin Resource Sharing (CORS) 
Policy in API Based Application..??

1. To allow all clients to access APIs anonymously.
2. To limit API access to specific clients and prevent                  //* Correct
    unauthorized requests.           
3. To restrict API access only to mobile applications.
4. To allow access to APIs from any origin without 
    restrictions.

Solution Description : The Purpose of CORS Policy un API-Based Application is to 
                restrict API Access to specific Clients and Prevent unauthorized 
                Requests from cross origin applications. It ensures that only trusted
                Clients like, specific web UI Clients or Mobile Applications are allowed 
                to access the API While preventing others from doing so. 
*/

/*
Configure CORS Policy

In a Real-World Scenario, when would you configure CORS policy to allow access 
from the multiple origins ..??

1. When you want to restrict API access to a single client application.
2. When you want to allow API access from any client without restrictions.
3. When your API is accessed only by mobile applications.
4. When you want to limit API access to specific trusted clients.               //* Correct

Solution Description : In a Real World Implementation, CORS policy is configured to allow access from
speicific trusted clients (eg.. specific web UI Clients or Mobile Applications). This helps to secure
the API and Prevents unauthorized access. limiting it only to those clients you trust.
*/