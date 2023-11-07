//* Import Modules
import express from "express";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import ejs from "ejs";
import path from "path"
import upload from "./src/middlewares/file-upload.middleware.js";
import bodyParser from "body-parser";
import auth from "./src/middlewares/auth.middleware.js";
import session from "express-session";
import jobRouter from "./src/routers/job.router.js";
import userRouter from "./src/routers/user.router.js";

//* Run the Server
const app = express();

//* SetUp View Engine
app.set("view engine","ejs");
app.set("views",path.join("src","views"));

//* SetUp Layouts
app.use(expressEjsLayouts);

//* Use Body Parser
//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
/* Extend True Means You Dont Want Prototype of Object Want Only Object */
app.use(bodyParser.json());

//* Use Express Sessions
app.use(session({
    secret : 'SecretKey',
    resave : false,
    saveUninitialized : true,
    cookie : {secure : false}
}))

//* Exposed Static Files
app.use(express.static(path.resolve("public")));

//* Create Instance of Controllersc
const jobController = new JobController();

//* Setup Routers
app.get("/",jobController.getHomePage);
app.use("/users/",userRouter);
app.use("/jobs/",jobRouter);

app.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})