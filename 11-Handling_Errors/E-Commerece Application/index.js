//* Import Modules

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
import logMiddleware from "./src/middlewares/logger.middleware.js";

//* Start the Server
const app = express();

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
  console.log(err);
  /* 
    If We Directly Send this Massage to the Customer then it means that this is a 
    server side error so we need to customize this error because if user made mistake
    on invalid login credentials or any other type of error our error handler sent
    server side error everytime so we need to customize our error handler for different
    kind of error   
  */
  res.status(503).send("Something Went Wrong ! Please Try Again Later ..");
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
  console.log(`Server is up and Run on Port 3200`);
});
