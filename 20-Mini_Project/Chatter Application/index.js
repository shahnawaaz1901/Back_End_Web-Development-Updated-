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
  console.log("Connection is Enstablished");

  socket.on("Connect", async (value) => {
    socket.name = value.name;
    activeUser.push(socket.name);
    const chats = await chatRepository.retrieveMessage();
    socket.emit("loadPreviousChats", chats);
  });

  socket.on("new-message", async (value) => {
    const messageDetail = {
      name: socket.name,
      message: value,
      time: `${new Date().getHours()}:${new Date().getMinutes()}`,
    };
    await chatRepository.storeMessage(messageDetail);
    socket.broadcast.emit("broadCast_message", messageDetail);
    console.log("Message has been emitted");
  });

  socket.on("disconnect", () => {
    const index = activeUser.findIndex((u) => u == socket.name);
    activeUser.splice(index, 1);
    console.log(activeUser);
    console.log("Disconnect User !!");
  });
});

export default server;
