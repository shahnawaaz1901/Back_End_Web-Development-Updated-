/* 
    Express Works with Core Module of Node.Js WhenEver We Create a server using 
    express function internally http.createrServer function is called. but using 
    express server gives us some kind of advantages. and whenever we use response.send
    internally respose.end function is called which is basically end the server response
    and send data or requested file to the client.
    You Can Check it Out Which Modules express uses internally on github.
    Because Like Node.Js , express is also open source which means code is available on Github
*/


/*
    MiddleWares : Middleware is the function which is called before client request is reached
            to the server, Middleware works in between from client to server. MiddleWare use
            to modify request, check request is valid or not, check data which is received from
            the client is valid or not.

            We Can Create Our own Middleware and Use them to modify the request . Middleware
            can be in multiple . A middleware which not called any middleware and send request
            to the server is called last middleware.

            MiddleWares are nothing but request handlers which allows you to intercept request
            and modify them and called next middleware (if Exist) in the pipeline


*/




const express = require('express');                                 // Import Express
const server = express();                                           // Call Express Function to Create Server

/*   Instead of Add Multiple Middlewares for Same Route
// You Can Pass multiple Callbacks for a Request Like Middleware
server.get('/',
function(req, res, next){               // next is a callback if we call next then it goes for next middleware
      Because We Use send funcion, this function end the request response 
        cycle and send reponse to the client that's why if we use send function 
        then it's end the response and response if we want to send from IInd 
        middleware never hit
    
    // res.send('This is From 1st Middleware');         Comment the End Cycle
    console.log('This is From First MiddleWare')
    next();
},
// Never hit if first Middleware end the response cycle
function(req, res){
    res.send('Response is send by second middleware');
});
*/

// Write Middleware seprately for same path
/*  
    Order of Middleware Metters Because if we write first middleware and not call 
    for second middleware using next function from first middleware then second middleware
    not called, that's why order of middleware is important
*/

// Different 
server.get('/',function(req, res, next){
    console.log('MiddleWare first is Called')
    next();
});
server.get('/',function(req, res){
    res.send('This is From Second MiddleWare');
})


server.listen(3200,function(error){                                 // Listen Server at the port 3200
    if(error){
        console.log(`Error : ${error}`);
        return;
    }
    console.log(`Server is Up and Run on Port 3200`);
})