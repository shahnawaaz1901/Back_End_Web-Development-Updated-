import express from "express";

const server = express();

server.use("/api/users");
server.use("/api/friends");
server.use("/api/posts");
server.use("/api/likes");
server.use("/api/comments");

export default server;