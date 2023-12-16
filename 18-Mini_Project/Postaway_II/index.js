import "./env.js";
import express from "express";
import auth from "./src/middlewares/jwt.auth.js";
import cookieParser from "cookie-parser";
import userRouter from "./src/features/users/users.router.js";
import cors from "cors";
import { loggerMiddleware, logger } from "./src/middlewares/winston.logger.js";

const server = express();

server.use(cors({ origin: "*", methods: ["GET", "POST"] }));

server.use(cookieParser());

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

server.use(loggerMiddleware);

server.use("/api/users", userRouter);
// server.use("/api/friends");
// server.use("/api/posts");
// server.use("/api/likes");
// server.use("/api/comments");

export default server;
