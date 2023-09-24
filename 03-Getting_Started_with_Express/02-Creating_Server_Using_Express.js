/*      Basic http server
const http = require('http');

const server = http.createServer((req, res)=>{
    res.end('Welcome to Node.Js Family');
})

server.listen(3100, function(error){
    if(error){
        console.log(error);
        return;
    }
    console.log('Server is Up and Run on Server 3100');
})
*/
/* Server Using Express */
// http not require to import because http module is already available in express
const express = require('express');

// For Create Server We Need to Called express function
const server = express();

// Response to request
// You Need to specify what is request type you received from the client write server name
server.get('/',function(req, res){
    /*
        We Can Also use .end function to end the request but we use send because express 
        internally handle end function and sends multiple things along with content through 
        itself which if we send through end function we need to write but express handle that
    */
    res.send('Response is Send by Express');
});

// Listening the Server
server.listen(3100, function(error){
    if(error){
        console.log(`Some Error has Occur : ${error}`);
        return;
    }
    console.log(`Server is Up and Run on Server 3100`);
})