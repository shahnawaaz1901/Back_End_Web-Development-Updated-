import "./dotenv.js";
import http from "http";
import { Server } from "socket.io";
import express from "express";

const app = express();

const server = http.createServer(app);

const activeUser = [];

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection is Enstablished");

  socket.on("Connect", (value) => {
    socket.name = value.name;
    activeUser.push(socket.name);
    socket.emit("Update-Active-User", activeUser);
  });

  socket.on("new-message", (value) => {
    const messageDetail = {
      name: socket.name,
      message: value,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };

    socket.broadcast.emit("broadCast_message", messageDetail);
    console.log("Message has been emitted");
  });

  socket.on("disconnect", () => {
    const index = activeUser.findIndex((u) => u == socket.name);
    activeUser.splice(index, 1);
    socket.emit("Update-Active-User", activeUser);
  });
});

export default server;
