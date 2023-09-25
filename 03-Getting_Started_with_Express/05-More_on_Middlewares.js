const express = require('express');
const server = express();
/* Because middleware callbacks argument takes array of middlewares so instead of doing this
server.get('/',function(req, res, next){
    console.log('first Middleware is Called');
    next();
})

server.get('/',function(req, res, next){
    console.log('Second Middleware is Called');
    next();
})
*/


function firstMiddleware(req, res, next){
    console.log('Inside the First MiddleWare');
    next();
}

function secondMiddleWare(req, res, next){
    console.log('Inside the Second Middleware');
    next();
}

function globalMiddleWare(req, res, next){
    console.log('Inside the Global middleWare');
    next();
}
/*
    But Problem is firstMiddleware and secondMiddleWare only Called When requested
    route is '/' but if You want that Middleware called on every route of the server
    then 'use' function comes into the picture. use function called middleware for 
    every route.
*/

// Called on Every Server Request
server.use(globalMiddleWare);

// Passing Array of Middlewares
server.get('/',[firstMiddleware, secondMiddleWare], function(req, res){
    console.log('Inside Middleware After First and Second');
    res.send('This Response Send By Last MiddleWare');
})


server.listen(3200, function(error){
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Server is Up and Run on Port 3200`);
})