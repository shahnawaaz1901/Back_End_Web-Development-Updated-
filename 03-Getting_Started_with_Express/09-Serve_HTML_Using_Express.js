const express = require('express');
const server = express();

server.get('/',function(req, res){
    res.send('This Response is Sent By Express');
})
/* 
    For Rendering Files Directly on Public we Can use static function 
    which we can use in middleware to render it directly on webPage
    Static function takes one argument of file path and whatever files
    exist in folder can be accessable by public through use /file_name.html 
    in route
*/
server.use(express.static('./public_for_server_HTML'));

server.listen(3200,function(){console.log(`Server is Up and Run on Port 3200`)});