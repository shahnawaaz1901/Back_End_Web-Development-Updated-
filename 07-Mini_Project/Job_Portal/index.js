import express from 'express';
import PortalController from './src/controller/portal.controller.js';
const app = express();
const portal = new PortalController();

app.get("/",portal.homepage);
app.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})