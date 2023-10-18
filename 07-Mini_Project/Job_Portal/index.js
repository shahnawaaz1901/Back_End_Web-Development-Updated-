//*Import Modules
import express from "express";
import JobController from "./src/controllers/job.controller.js";
import ejs from "ejs";
import path from "path"
//*Run the Server
const app = express();

//*SetUp View Engine
app.set("view engine","ejs");
app.set("views",path.join("src","views"));


//*Create Instance
const jobController = new JobController();
//*Setup Routers
app.get("/",jobController.getHomePage);
app.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})