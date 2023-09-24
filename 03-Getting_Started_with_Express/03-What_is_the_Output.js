/*
Express Server

Which code snippet(s) demonstrate(s) the correct implementation of an Express Server?


A)
    const express = require('express');
    const server = express();
    server.get('/',function(req, res){
        res.send('Response is Send by Express');
    });
    const port = 3000
    server.listen(port)
    console.log('Server is listening at 3000');

B)
    const express = require('express');
    const app = express();
    server.get('/',function(req, res){
        res.end('Response is Send by Express');
    });
    const port = 3000
    server.listen(port)
    console.log('Server is listening at 3000');
    
C)
    const express = require('express');
    const app = express();
    server.get('/',function(req, res){
        res.send('Response is Send by Express');
    });
    const port = 3000
    server.listen(port)
    console.log('Server is listening at 3000');
    
D)
    const express = require('express');
    const server = express();
    server.get('/',function(req, res){
        req.send('Response is Send by Express');
    });
    const port = 3000
    server.listen(port)
    console.log('Server is listening at 3000');
    

1. A
2. B
3. C
4. D

Solution Description : Option A demonstrates the correct implementation of an Express Server. 
                Option B and C use an undefined variable 'server' instead of the defined variable 'app' 
                Option D uses 'req.send' instead of 'res.send' to send the response.
*/