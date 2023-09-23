const http = require('http');

const server = http.createServer((req, res)=>{
    res.write('This Statement is Sent By NodeJs . ');
    /*  This Statment Gives Error : Because if You Enter in if Condition then You Write res.end() which means
        you want to end the response but outside if default statement is also end the response so due to 2 res.end()
        statement is called NodeJs gives you error.
    if(req.url == '/first'){
        res.end('This is First Statement');
    }
    res.end('Welcome to NodeJs Application' );
    */
    /* 
        For Fixing Error of Above Statement You Can also end the function when you end the 
        response or you can add an else and put default statement in that.
    */

    /* Method 1
    if(req.url == '/first'){
        return res.end('This is First Statement');          // When Ever Enter in the if condition Response and function ends simontanously
    }
    res.end('Welcome to NodeJs Application' );
    */
    // Method 2
    if(req.url == '/first'){
        res.end('This is First Statement');          // When Ever Enter in the if condition NodeJs never enter in else so only one response is end
    }else{
        res.end('Welcome to NodeJs Application' );
    }
    
    
    
});

server.listen(3000, function(error){
    console.log(`Server is Up and Run on Port : 3000`);
})