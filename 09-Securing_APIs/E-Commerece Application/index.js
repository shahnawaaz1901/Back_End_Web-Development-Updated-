//* Import Modules
import express from "express";
import productRouter from "./src/features/products/product.router.js";
import userRouter from "./src/features/user/user.router.js"
import bodyParser from "body-parser";
import basicAuthorizer from "./src/middlewares/basicAuth.middleware.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

//* Start the Server
const app = express();

//* Body Parser Use to Get Data on req.body
app.use(bodyParser.json());

//* Its Good practice to write the /api first when we Create Route for API
//* We Only Need to Add Authentication For Access the Products
app.use("/api/products",jwtAuth,productRouter);            
app.use("/api/users",userRouter);

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
