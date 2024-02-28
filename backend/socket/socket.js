import { Server } from "socket.io";
// import socketio from "socket.io";
import express from "express";
const app = express();
import http from "http";
const server = http.createServer(app);
// const io = socketio(server);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST"],
    optionsSuccessStatus: 200
  }
});

// real time messages 
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
}


// create a map of the sockets that are connected for that userid
const userSocketMap = {}; // {userid: socketId}

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId != "undefined") userSocketMap[userId] = socket.id;

  // emit an event to all users based on the socket map
  // listen for one disconnect event in the socket
  // delete the disconnected socket from the map
  // emit to all users again since online user has been disconnected
  // io.emit() is used to send events to all the connected clients
  // whenever a user connects we can grab it with that event name "getOnlineUsers"
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  // socket.on() is used to listen to the events. can be used both on the client and on server side
  socket.on("disconnect", () => {
    console.log("User disconnected", socket.id);
    delete userSocketMap[userId];
    //since we delete from the socket connection the online users map will also change therefore we call it again here 
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  })
})

export {
  app, 
  io,
  server
}