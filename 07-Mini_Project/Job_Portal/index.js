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
app.use(express.static("public"));

//* Create Instance of Controllersc
const jobController = new JobController();
const userController = new UserController();

//* Setup Routers
app.post("/login",userController.loginUser);
app.get("/",jobController.getHomePage);
app.get("/jobs",jobController.getJobPage);
app.get("/job/applicants/:id", jobController.getJobApplicants);
app.get("/job/:id",jobController.getJobDescription);
app.get("/login",userController.getLogin);
app.post("/ragister",userController.ragisterUser);
app.post("/apply-job",upload.single('resume'), jobController.addJobApplicant);
app.get("/postJob",jobController.getPostJobPage);
app.post("/postJob",jobController.postJob);
app.get("/update-job/:id", jobController.updateJob);
app.get("/logout",userController.logOut);

app.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})