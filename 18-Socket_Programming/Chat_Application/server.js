import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { connect } from "./config.js";
import { chatModel } from "./chat.Schema.js";
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

  socket.on("join", async (userName) => {
    /* Storing username in socket object */
    socket.username = userName;
    /* 
      When We take name from the user then its time to render all previous 
      chats from the database and render it on the front end chat box
    */
    /* 
        We search in the database after searching we sort the data based on 
        timestamp and after sorting instead of sending directly first we set 
        limit to 20 documents and send it to client, value of timestamp 1 means 
        sorting in descending order
      */
    try {
      const msg = await chatModel.find().sort({ timeStamp: 1 }).limit(20);
      socket.emit("load_massage", msg);
    } catch (error) {
      console.log(error);
    }
  });
  /* 
    From Front End when user click send button new-massage event is triggered 
    so here we receive the massage which user want to send so that we can 
    broadcast the massage to the every One
    */
  socket.on("new-massage", (msg) => {
    console.log("User Tried to Send Some Massage");
    /* 
        Because user sent the massage so that now our work is to broadcast this massage, so 
        that everyone able to see this massage but how can we broadcast this massage we can
        broadcast like this
    */
    const userMassage = new chatModel({
      username: socket.username,
      massage: msg,
      timeStamp: new Date().toDateString(),
    });
    userMassage.save();
    socket.broadcast.emit("broadcast-massage", userMassage);
    /* 
        When ever user send the massage user not say that broadcast this massage to other clients 
        sever do this automatically whenever user tried to send some massage to the other people 
    */
    /* 
        socket.broadcast.emit emit the event named "broadcast-massage" now our work to again check 
        for event in front end js side and if the event is occure then render the massage to the front 
        end 
    */
  });

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
  connect();
});
