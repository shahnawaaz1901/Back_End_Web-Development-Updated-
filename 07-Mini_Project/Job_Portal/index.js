//* Import Modules
import express from "express";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import ejs from "ejs";
import path from "path"
import multer from "multer";
import upload from "./src/middlewares/file-upload.js";
import ApplicantController from "./src/controllers/applicant.controller.js";

//* Run the Server
const app = express();

//* SetUp View Engine
app.set("view engine","ejs");
app.set("views",path.join("src","views"));

//* SetUp Layouts
app.use(expressEjsLayouts);

//* Exposed Static Files
app.use(express.static("public"));

//* Create Instance
const jobController = new JobController();
const userController = new UserController();
const applicantController = new ApplicantController();

//* Setup Routers
app.get("/",jobController.getHomePage);
app.get("/jobs",jobController.getJobPage);
app.get("/job/:id",jobController.getJobDescription);
app.get("/login",userController.getLogin);
app.post("/apply-job",upload.single('resume'), applicantController.addNewApplicant);
app.listen(3200,function(err){
    if(err){
        console.log(`Error : ${err}`);
        return;
    }
    console.log(`Server is Up and Run on Port : 3200`);
})