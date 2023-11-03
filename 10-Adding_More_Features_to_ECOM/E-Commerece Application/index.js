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
import apiDocs from "./swagger.json" assert { type: "json" };

//* Start the Server
const app = express();

app.use((req, res, next) => {
  /* 
    For Allow Our Server to Serve response to Different Origin We Need to set
    response header access-control-allow-origin to that perticular origin link
    which we want to allow to access the data after the API Call Which is Done
    By the Client Side.
  */
  /* 
    We Always need to Speicify Access Controll to the Response Object no the 
    Req Object because it's the Server responsibiliy for response it's not 
    Client responsibility thats why we Only need to specify access control to
    the response Object 
  */

  //* Response header for all Origins withOut restrictions
  //* res.header("Access-Allow-Control-Origin", "*");

  //* Response Header for a specific Different Origin
  res.header("Access-Control-Allow-Origin", "http://localhost:3200");
    
  /*
    We Also need to configure what all type of headers client can send as part of
    CORS policy 
  */
  app.use("Access-Control-Allow-Header","content-type, authorization");

  /*
    Along with this we Also Need to Specify that what kind of http methods allows
    to the Client to make API Call to the Server default value for the request
    method type is '*' which means All type of Request Methods Allow to Client
  */
  app.use("Access-Control-Allow-Method","*");
  /*
    Preflight : Preflight is the verification request that ensures does server
            needs to response this request. Why Browser sent the preFlight Request
            because we have pass a header which is authorization header for 
            secure our APIs. In preFlight request browser sent request to the server
            which http request method is options which we Not Specified We Specify
            Only get and Post Request method that's why we need to sent a response 
            to the browser with ok massage  
  */
  if(req.method == "OPTIONS"){
    res.sendStatus(200);
  }
  next();
});

//* SetUp Cookie Parser
app.use(cookieParser());

//* Body Parser Use to Get Data on req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/* 
  Swagger.serve create interface documentation and and swagger.setup pass json for 
  render on the screen
*/
app.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
app.use("/api/products", jwtAuth, productRouter);
app.use("/api/users", userRouter);
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
  console.log(`Server is up and Run on Port 3200`);
});
