import "./env.js"
import express from "express";
import auth from "./src/middlewares/jwt.auth.js";
const server = express();

server.use(express.urlencoded({ extended: false }));
server.use(express.json());

server.use("/api/users");
server.use("/api/friends");
server.use("/api/posts");
server.use("/api/likes");
server.use("/api/comments");

export default server;
