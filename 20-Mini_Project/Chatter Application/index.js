import "./dotenv.js";
import http from "http";
import { Server } from "socket.io";
import express from "express";
import ChatRepository from "./feature/chats/chats.repository.js";

const app = express();

const server = http.createServer(app);

const chatRepository = new ChatRepository();
const activeUser = [];

const io = new Server(server, {
  cors: {
    methods: ["GET", "POST"],
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Connection Enstablished !!");
  socket.on("newUserConnect", async (value) => {
    socket.name = value.name;
    activeUser.push(socket.name);
    socket.broadcast.emit("Update-User-List", {
      activeUser,
      name: socket.name,
      reason: "join",
    });

    const chats = await chatRepository.retrieveMessage();
    socket.emit("loadPreviousChats", chats);
    socket.emit("loadOnlineUsers", activeUser);
  });

  socket.on("new-message", async (msg) => {
    const messageDetail = {
      name: socket.name,
      message: msg,
      // Store time in MiliSecond Format So that We Can Sort Correctly when Retrieve Chats
      time: `${new Date().getTime()}`,
    };
    await chatRepository.storeMessage(messageDetail);
    socket.broadcast.emit("broadCast_message", messageDetail);
  });

  socket.on("typing", (user) => {
    socket.broadcast.emit("typing-status", user);
  });

  socket.on("disconnect", () => {
    const index = activeUser.findIndex((u) => u == socket.name);
    activeUser.splice(index, 1);

    socket.broadcast.emit("Update-User-List", {
      activeUser,
      name: socket.name,
      reason: "leave",
    });
    console.log("Connection End !!");
  });
});

export default server;
