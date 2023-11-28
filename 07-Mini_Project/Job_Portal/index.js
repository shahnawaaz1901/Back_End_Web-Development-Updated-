//* Import Modules
import express from "express";
import JobController from "./src/controllers/job.controller.js";
import UserController from "./src/controllers/user.controller.js";
import expressEjsLayouts from "express-ejs-layouts";
import ejs from "ejs";
import path from "path";
import upload from "./src/middlewares/file-upload.middleware.js";
import bodyParser from "body-parser";
import auth from "./src/middlewares/auth.middleware.js";
import session from "express-session";
import jobRouter from "./src/routers/job.router.js";
import userRouter from "./src/routers/user.router.js";
import fs from "fs";

//* Run the Server
const app = express();

//* SetUp View Engine
app.set("view engine", "ejs");
app.set("views", path.join("src", "views"));

//* SetUp Layouts
app.use(expressEjsLayouts);

//* For Extract the Static Files from EJS
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//* Use Body Parser
//* parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
/* Extend True Means You Dont Want Prototype of Object Want Only Object */
app.use(bodyParser.json());

//* Use Express Sessions
app.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//* Exposed Static Files
app.use(express.static(path.resolve("public")));

//* Create Instance of Controllersc
const jobController = new JobController();

//* Setup Routers

app.get("/", jobController.getHomePage);
app.use("/users/", userRouter);
app.use("/jobs/", jobRouter);
app.get("/getResume/:resume", (req, res) => {
  /* Not use this Method Because it may leaks the internal that where we store the files
  *Get the name of Resume
  
  const { resume } = req.params;

  *Create path using public Folder
  
  const filePath = path.join("public","data",resume);
  res.download(filePath);
*/
  // *Get the name of Resume

  const { resume } = req.params;

  // *Create path using public Folder

  const filePath = path.join("public", "data", resume);
  const fileExist = fs.existsSync(filePath);
  if (fileExist) {
    // Read the file 
    const file = fs.createReadStream(filePath);
    // statSync function use to get the size of content
    const stat = fs.statSync(filePath);
    // writeHead function takes status code and the headerss
    res.writeHead(200, {
      "Content-Type": "application/pdf",
      "Content-Length": stat.size,
      /* 
        filename attribute decide which name we use to send the file to the user 
      */
      "Content-Disposition": `attachment; filename=${resume}`,
    });
    /* 
      Pipe function takes argument of destination where we want to send the file
      in Our Case we want to send the file at user send so we pass the response
      object because we want to send file as response
    */
    file.pipe(res);
  } else {
    res.status(404).send("not found !!");
  }
});

app.listen(3200, function (err) {
  if (err) {
    console.log(`Error : ${err}`);
    return;
  }
  console.log(`Server is Up and Run on Port : 3200`);
});
