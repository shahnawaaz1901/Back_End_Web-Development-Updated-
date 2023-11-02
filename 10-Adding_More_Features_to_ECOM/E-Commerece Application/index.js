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

//* Listen the Server on Port 3200
app.listen(3200, function (err) {
  if (err) {
    console.log(`Error While Run the Server : ${err}`);
    return;
  }
  console.log(`Server is up and Run on Port 3200`);
});
