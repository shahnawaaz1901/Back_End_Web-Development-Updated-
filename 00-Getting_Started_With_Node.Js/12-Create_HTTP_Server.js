// Create a Server Using HTTP

//1. Import HTTP Library Module
const http = require('http');

//2. Create HTTP Server
const server = http.createServer((request, response)=>{
    response.end('Response received at port 8080');                 // End is the function to end the request and send response
});

/*
    In Computer many Server is Running But How Can we Identify that if request comes
    for a server then request is goes for that perticular server. For specify we need 
    to write a port which indicates that this request is for that perticular server.
    If You Use Multiple Server in a Single System then it's nessesory to gives every 
    server a different port number.
*/

const port = 8080;

// Listen is Function which listen Request
server.listen(port, (err)=>{
    if(err){
        console.log(`Error While Connecting to Server on port : ${port}`);
        return;
    }
    console.log(`Response received at port ${port}`);
})