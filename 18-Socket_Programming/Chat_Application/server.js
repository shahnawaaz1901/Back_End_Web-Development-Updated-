import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

//* 1. Initialize Server
const app = express();

//* 2. Create Server
const server = http.createServer(app);
/* 
    createServer needs specification so we need to pass app while creating the 
    server using http 
*/

//* 3. Create Socket Server
const io = new Server(server, {
  // Server Class import from socket.io
  cors: {
    origin: "*", // Because we want to allow access from any where so provide "*"
    methods: ["GET", "POST"], // Get for Receiving and Post for Sending Massage
  },
});
/*
    Socket server use that http server to start the communication. 
*/

//* 4. Use Socket Events
io.on("connect", (socket) => {
  /* 
    When Our Socket connection is completed then we need to print the statement
    on is function for the event which takes two argument one is event another
    one is call back which triggered when event is done. callback takes the argument
    name socket which we can use when another events is trigerred, Here we collect 
    the socket in parameter of callback and use that socket instanse after the connection
    of socket is end
    */
  console.log("Connection is enstablished");
  /* 
    Use socket instance to pass a callback when socket connection is ended (event 
    calls "disconnect"). callback is trigerred when "disconnect" event is emit or
    trigerred
    */
  socket.on("disconnect", () => {
    console.log("Connection is ended");
  });
});

// 3. Listen the Server at the Port 3200
server.listen(3200, (err) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log("Server is Up and Run on Port 3200");
});
