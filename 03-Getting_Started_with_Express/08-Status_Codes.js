
/* -- Status Codes -- */

/*
    Status Codes is Specify While Sending Response from the Server to the Client to
    Indicate Status of Response from Server.
*/

/*
    Many Types of Http Response Codes Available But Most Popular Codes :
    1. 200 : OK :- Indicate that Request is Successfully Fulfiled by the Server
    2. 500 : Internal Server Error :- An Unknown Type of Error which server not understand how to handle
    3. 502 : Bad Gateway :- While Working as Gateway to get a response needed to handle the request, got invalid response
    4. 403 : ForBidden :- Client is Not Authorized to access data or Client not have rights to access data or information
    5. 404 : Not Found :- Server Not Found the Resource Which You Want to Access. This Might Be Happen File was Removed or deleted
    6. 204 : No Content :- Mainly Use in Delete Request Where No Content is required by User
    7. 201 : Created :- User is Created on Server
*/

// Learn How to Send Status Codes Along With Response
const express = require('express');
const server = express();

server.get('/',function(req, res){
    // mention code in status function before send the response. Status Code is 200 Means Request Fulfiled
    res.status(200).send('User is Fetched');
})

server.post('/',(req, res)=>{
    // mention code in status function before send the response. Status coide is 201 which means post request is Successful
    res.status(201).send('User is Created');
})
server.listen(3000, function(){console.log(`Server is Up and Run on Port 3000`)});
