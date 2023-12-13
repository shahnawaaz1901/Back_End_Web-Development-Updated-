import server from "./index.js";
import connectToDB from "./config/mongoose.js";

server.listen(3200, (err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Server is up and Run on Port 3200");
    connectToDB();
})