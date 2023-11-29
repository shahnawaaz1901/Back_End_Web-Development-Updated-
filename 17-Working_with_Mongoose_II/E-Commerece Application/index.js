//* Import Modules
//? Import Environment File and Config that at Top so that Every module can access the enviroment file
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
import orderRouter from "./src/features/order/order.router.js";
import jwtAuth from "./src/middlewares/jwt.middleware.js";

//? Documentation and Error Handler
import apiDocs from "./swagger.json" assert { type: "json" };
import ApplicationError from "./src/features/errorHandler/application.error.js";
import logMiddleware from "./src/middlewares/logger.middleware.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
import { connenctUsingMongoose } from "./src/config/mogoose.js";
import likeRouter from "./src/features/Like/like.router.js";

//* Start the Server
const app = express();

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
app.use("/api/orders", jwtAuth, orderRouter);
app.use("/api/likes", jwtAuth, likeRouter);

//* Default Route
app.get("/", function (req, res) {
  res.send("Welcome to API Application !!");
});

//* Add Error Handler to the Application Level
app.use((err, req, res, next) => {
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

  console.log(`Server is up and Run on Port 3200`);
  // connectToMongoDB();
  connenctUsingMongoose();
});
