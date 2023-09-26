/*
    Many Types of http Request is Exist But Mainly Uses Requests :
    1. GET              :           Retreive Data
    2. POST             :           Send and Store Data to the Server
    3. PUT              :           Update Data which is Exist in Server
    4. DELETE           :           Delete Data on the Server
*/

/*
    For CRUD Operations Request in Use
    Create  :   POST
    Read    :   GET
    Update  :   PUT
    Delete  :   DELETE
*/

const express = require('express');
const server = express();
// Get Request
server.get('/',function(req, res){
    res.send('Get Request Receive');
})
// Post Request
server.post('/',function(req, res){
    res.send('Post Request Receive');
})
// Put Request
server.put('/',function(req, res){
    res.send('Put Request Receive');
})
// Delete Request
server.delete('/',function(req, res){
    res.send('Delete Request Receive');
})
/* We Can Check All Request WithOut Doing Some Extra Effort Using POSTMAN */

server.listen(3200, function(){console.log(`Server is Up and Run On Port 3200`)});

/*
Types of Requests

Which code snippet(s) demonstrate(s) the correct implementation of different types 
of requests in an Express Server? ( Multiple )

A)
const express = require('express');
const server = express();
// Get Request
server.get('/',function(req, res){
    res.send('Get Request Receive');
})
// Post Request
server.post('/',function(req, res){
    res.send('Post Request Receive');
})
// Put Request
server.put('/',function(req, res){
    res.send('Put Request Receive');
})
// Delete Request
server.delete('/',function(req, res){
    res.send('Delete Request Receive');
})
server.listen(3200, function(){console.log(`Server is Up and Run On Port 3200`)});

B)
import express from 'express'
const app = express();

app.get('/',function(req, res, next){
    next();
})

// Get Request
app.get('/',function(req, res){
    res.send('Get Request Receive');
})
// Post Request
app.post('/',function(req, res){
    res.send('Post Request Receive');
})
// Put Request
app.put('/',function(req, res){
    res.send('Put Request Receive');
})
// Delete Request
app.delete('/',function(req, res){
    res.send('Delete Request Receive');
})
app.listen(3200, function(){console.log(`Server is Up and Run On Port 3200`)});

C)
const express = require('express');
const server = express();
server.get('/',function(req, res){
    res.send('Get Request Receive');
})
server.post('/',function(req, res){
    res.send('Post Request Receive');
})
server.update('/',function(req, res){
    res.send('Put Request Receive');
})
server.delete('/',function(req, res){
    res.send('Delete Request Receive');
})
server.listen(3200, function(){console.log(`Server is Up and Run On Port 3200`)});

D)
const express = require('express');
const app = express();

app.get('/',function(req, res, next){
    next();
})

app.get('/',function(req, res){
    res.send('Get Request Receive');
})
app.post('/',function(req, res){
    res.send('Post Request Receive');
})
app.update('/',function(req, res){
    res.send('Put Request Receive');
})
app.delete('/',function(req, res){
    res.send('Delete Request Receive');
})
app.listen(3200, function(){console.log(`Server is Up and Run On Port 3200`)});


1. A                                                    // Correct
2. B                                                    // Correct
3. C
4. D

Solution Description : Options C and D are incorrect because there is no such HTTP method 
                    as 'update.' HTTP has four standard methods: GET, POST, PUT, and DELETE.

*/