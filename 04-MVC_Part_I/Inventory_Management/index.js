const express = require('express');
const server = express();

server.get('/',function(req, res){
    res.send('Welcome to Inventory Management App');
})
/*
    For Better Readability and Scalability and Divide app into Seprate parts or folders,
    So that Application can Managed Easily By Other Developer. For Divide into Sub Parts
    We Create a Folder src that folder Contains All the Source Code of our Web Application
    this index.js File is Also Code But we Didn't Put it inside src Because index.js is
    entry point of Our App. SRC folders contains three folders model, views and controllers,
    Which is the Three Different Parts of Our Applican Which is Based on MVC Pattern.
*/








server.listen(3200,function(err){
    if(err){{
        console.log(`Error : ${err}`);
        return;
    }}
    console.log(`Server is Up and Run on Port : 3200`);
})