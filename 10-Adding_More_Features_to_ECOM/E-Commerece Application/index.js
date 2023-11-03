//* Import Modules
import express from "express";
import swagger from "swagger-ui-express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import productRouter from "./src/features/products/product.router.js";
import userRouter from "./src/features/user/user.router.js";
import cartRouter from "./src/features/cart/cart.router.js";
// import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";   //* Replace with jwt
import jwtAuth from "./src/middlewares/jwt.middleware.js";

/* 
  If we directly import normally any json file then it thrown an error 
  because import function imports the javascript mdoule so we need to tell
  explicitly that this is a json object by writing an assert keyword and add
  an object and put type value is json in that object
*/
import apiDocs from "./swagger.json" assert {type : 'json'};

//* Start the Server
const app = express();

//* SetUp Cookie Parser
app.use(cookieParser());

//* Body Parser Use to Get Data on req.body
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/* 
  Swagger.serve create interface documentation and and swagger.setup pass json for 
  render on the screen
*/
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs))
app.use("/api/products",jwtAuth,productRouter);            
app.use("/api/users",userRouter);
app.use("/api/cart", jwtAuth, cartRouter);
//* Default Route
app.get("/", function (req, res) {
  res.send("Welcome to API Application !!");
});
/* 
  If User Search for an API which Not Exist Then Our Express Server Send the Default 
  Response Can't Get But How Can We Tell the User that Resource which User Looking for
  is Not Exist . We Need to Add Middleware At the Bottom of All Routes that Resource
  Which user looking for is not Exist 
*/
//* Handle 404 Error

/* 
  We Write this Middleware Because this middlware not have any paths that's why this
  middleware is always executes if user request routes not matched with above routes
  and we can Understand this concept with middleware functions which we use like cookie
  parses bodyParser sessions this all middlewares not depend on any routes that's why 
  this middleware always executes on Any Request. 
*/
app.use((req, res)=>{
  req.status(404).send("API Which You Looking for Is Not Exist .. :-(")
})

//* Listen the Server on Port 3200
app.listen(3200, function (err) {
  if (err) {
    console.log(`Error While Run the Server : ${err}`);
    return;
  }
  console.log(`Server is up and Run on Port 3200`);
});
