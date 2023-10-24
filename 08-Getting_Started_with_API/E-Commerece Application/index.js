//* Import Modules
import express from 'express';

//* Start the Server
const app = express();

//* Set the Route
app.get("/",function(req, res){
    res.send("Welcome to API Application !!");
})

//* Listen the Server on Port 3200
app.listen(3200, function(err){
    if(err){
        console.log(`Error While Run the Server : ${err}`);
        return;
    }
    console.log(`Server is up and Run on Port 3200`);
})