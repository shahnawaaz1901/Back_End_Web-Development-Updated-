import express from 'express';

const server = express();

server.listen(3200, (err)=>{
    if(err){
        console.log(`Error While Listening the Server : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port 3200`);
})