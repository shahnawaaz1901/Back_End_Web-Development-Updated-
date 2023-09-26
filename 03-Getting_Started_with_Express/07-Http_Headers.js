/*
    HTTP Protocols Also Gives Us HTTP headers.
    Purpose of HTTP Protocols :
    Purpose of HTTP protocols is Provide Efficient Communication Between Client and Server.
    
    Puspose of HTTP Headers (For UnderStanding): 
    1. Headers Are Used By Client and as Well as By Server.
    2. When Client is Sending data to the server Client Can Specify what Kind of Data or 
        What Type of data or format of Data it sends to the server similarly server can 
        also Specify this type of Information.

    Puspose of HTTP Headers (Theory Basis): 
    1. Provide Meta Data about Request or response, suc as the content type or length
    2. Set cookies to store user specific data
    3. control caching behavior
    4. Communicate Srerver Specific Information to the Client

    Many Types of HTTP Headers Exist But Most Popular HTTP Headers :
    1. Content-Type (Which Type of Content)
    2. Authorization (For Secured Server which is access only by authorize persona or authority)
    3. Accept Language (Related to Encoding in which Encoding Format Specify to Communicate)
    4. User-Agent 

*/

const express = require('express')
const server = express();

server.get('/',function(req, res){
    /* 
        Set function takes two argument first is key and second one is value of that key
        this Content-Type is Header Which You Can see in the browser or Postman app where 
        Request is sent to the Server. Because Content-type is Also http header that's and
        we set http header Content-Type Value to text/plain. Which Indicate at Client end 
        that Content Which is Received is in Plain text format.
    */
    res.set('Content-Type','text/plain');
    res.send('Get Request Received');
})
server.post('/',function(req, res){
    res.send('Post Request Received');
})
server.put('/',function(req, res){
    res.send('Put Request Received');
})
server.delete('/',function(req, res){
    res.send('Delete Request Received');
})

server.listen(3000, function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port 3000`);
})

/*
    Some Other Kind of Headers Which is Not Sent By Us But Receive at Client Side on Browser
    or software like postman. This Headers Not required to send by the Developer But Important
    to receive at the Browser end that's why Node.Js and Express sent that kind of nessesory 
    headers by itself internally.

*/

