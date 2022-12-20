const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const main =require('./main')
const dataBase = require("./database");

app.use(cors());

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "https://chessprojectbackend.herokuapp.com/",
        methods: ["GET", "POST"],
    },
});


io.on("connection", (socket) => {
    console.log("User Connected :" + socket.id);

  socket.on("join", function (roomName) {
    let rooms = io.sockets.adapter.rooms;
    let room = rooms.get(roomName);

    if (room == undefined) {
      socket.join(roomName);
      socket.emit("created", 'Room created. Waiting for other player....' );
    } else if (room.size == 1) {
      
      socket.join(roomName);
      
      io.to(roomName).emit("joined", "joined room")
      
    } else if(room.size == 2) {
      
    } else {
      
      socket.emit("full", "room is full");
    }
    
    main.startGame(io, socket, roomName, room, rooms)
   
  });
 

})
