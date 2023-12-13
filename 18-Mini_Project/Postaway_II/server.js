import server from "./index.js";

server.listen(3200, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and Run on Port 3200");
})