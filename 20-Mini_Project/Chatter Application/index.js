import "./dotenv.js";
import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is Enstablished");

  socket.on("disconnect", () => {
    console.log("Connection is Ended !");
  });
});

export default server;
