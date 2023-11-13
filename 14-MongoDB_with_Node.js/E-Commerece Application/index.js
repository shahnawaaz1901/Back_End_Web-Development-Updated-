//* Import Modules
//? Import Environment File and Config that at Top so that Every module can access the enviroment file
/* Instead of Writing and config at the top separate the both statement into another js file and import it at the top same as module 
import dotenv from 'dotenv';
dotenv.config();
*/
//* We Can Store the file and Config and import that file at the top
import "./env.js";

//? Packages or Third Party Modules
import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

//? Internal Modules
import productRouter from "./src/features/products/product.router.js";
import userRouter from "./src/features/user/user.router.js";
import cartRouter from "./src/features/cart/cart.router.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

//? Documentation and Error Handler
import apiDocs from "./swagger.json" assert { type: "json" };
import ApplicationError from "./src/features/errorHandler/application.error.js";
import logMiddleware from "./src/middlewares/logger.middleware.js";
import { connectToMongoDB } from "./src/config/mongodb.js";

//* Start the Server
const app = express();

//* Load the environment variables in Application
/* 
  Configuration allow us to use environment variables in Our file  
  But We Need to config our dotenv file at the top because before we import or loaded the connectToDB function that's why we got an error 
  That's why config the file into the database file
  dotenv.config();
*/
//* SetUp the CORS Configuration
app.use(
  cors({
    origin: "http://localhost:5500",
  })
);

//* SetUp Cookie Parser
app.use(cookieParser());

//* Body Parser Use to Get Data on req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(logMiddleware);

app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);
app.use("/api/cart", jwtAuth, cartRouter);
//* Default Route
app.get("/", function (req, res) {
  res.send("Welcome to API Application !!");
});

//* Add Error Handler to the Application Level
/* 
  Server Codes 400 is used for bad request and in server errors we use the 500 status
  codes request which is used for server errors like server crash server problems 
*/
app.use((err, req, res, next) => {
  /* 
    If We Directly Send this Massage to the Customer then it means that this is a 
    server side error so we need to customize this error because if user made mistake
    on invalid login credentials or any other type of error our error handler sent
    server side error everytime so we need to customize our error handler for different
    kind of error
  */
  /*
    500 mean internal server error this error is occure from the server side so we 
    need to change the error code to 500 because 503 error which represent the service
    is unavailable 
  */
  /* 
    Instead of Sending Fix Response to the Client For Every Request We Need to Send 
    the actual error using our application level class which contains both message
    and status code. So We First need to check that user define error is occure or
    not if User define error is not occure then we send the server side error by 
    send the message something went wrong and status code 500 along with the message
  */
  if (err instanceof ApplicationError) {
    //* Check if Error Occure on Controllers or Model
    return res.status(err.errorStatusCode).send(err.message);
  }

  return res
    .status(500)
    .send("Something Went Wrong ! Please Try Again Later ..");
});

app.use((req, res) => {
  res.status(404).send({
    status: "failure",
    massage:
      "API Which You Looking for Is Not Exist, Please Visit Our API Documentation on http://localhost:3200/api-docs/ for More Details",
  });
});

//* Listen the Server on Port 3200
app.listen(3200, function (err) {
  if (err) {
    console.log(`Error While Run the Server : ${err}`);
    return;
  }
  /* 
    Because we Need to Connect the Database when Our server is started so 
    that after start the server Our listen function called so that we need 
    to call Our MongoDB connection function when Our Server is Started 
    Successfully !! 
  */
  console.log(`Server is up and Run on Port 3200`);
  connectToMongoDB();
});
