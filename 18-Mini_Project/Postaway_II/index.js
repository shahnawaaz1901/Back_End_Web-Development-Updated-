import "./env.js";
import express from "express";
import auth from "./src/middlewares/jwt.auth.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/users/users.router.js";
import cors from "cors";
import { loggerMiddleware, logger } from "./src/middlewares/winston.logger.js";
import ApplicationError from "./src/features/error/error.application.js";

const server = express();

server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);

server.use(cookieParser());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(loggerMiddleware);

server.use("/api/users", userRouter);
// server.use("/api/friends");
// server.use("/api/posts");
// server.use("/api/likes");
// server.use("/api/comments");

server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    return res.status(err.errStatusCode).send(err.message);
  }
  res.status(500).send("Internal Server Error !");
});
export default server;
