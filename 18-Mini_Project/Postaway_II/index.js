//? Load Environmanet Variables
import "./env.js";

//? Packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import swagger from "swagger-ui-express";

//? Internal Modules
import auth from "./src/middlewares/jwt.auth.js";
import userRouter from "./src/features/users/users.router.js";
import { loggerMiddleware } from "./src/middlewares/winston.logger.js";
import postRouter from "./src/features/posts/posts.router.js";
import friendRouter from "./src/features/friends/friends.router.js";
import likeRouter from "./src/features/likes/likes.router.js";
import commentRouter from "./src/features/comments/comments.router.js";
import errorMiddleware from "./src/features/error/error.response.js";
import apiDoc from "./swagger.json" assert { type: "json" };

//* Intialize Server
const server = express();

//* Setup CORS Policy
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//* SetUp Cookies
server.use(cookieParser());

//* For Populating req.body
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

//* Log Requests
server.use(loggerMiddleware);

//* For API Documentation
server.use("/apiDocs", swagger.serve, swagger.setup(apiDoc));

//* SetUp Routers
server.use("/api/users", userRouter);
server.use("/api/posts", auth, postRouter);
server.use("/api/friends", auth, friendRouter);
server.use("/api/likes", auth, likeRouter);
server.use("/api/comments", auth, commentRouter);

//* Error Handling
server.use(errorMiddleware);

//* Default Response
server.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Resource you are looking for not exist please visit our API Doc at ${"/apiDocs"}`,
  });
});
//* Export
export default server;
