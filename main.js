
var sio
var gameSocket

const startGame = (io, socket, roomName, room, rooms) => {
    sio = io
    gameSocket = socket

    gameSocket.on('move', (data) => newMove(data, roomName))

    gameSocket.on('username', (username) => sendUsername(username, roomName))

    gameSocket.on('username2', (username2) => sendUsername2(username2, roomName ))

    gameSocket.on('determineSide', (side) => determineSide(side, room, rooms))
}

function newMove(data, roomName) {
    
    sio.to(roomName).emit("move", data)
    
}

function sendUsername( username, roomName ) {
    sio.to(roomName).emit("username", username)
 }

function sendUsername2(username2, roomName) {
    sio.to(roomName).emit("username2", username2)
 }

function determineSide(side, room, rooms){
    
const clientIds = [...room]
const roomMakerId = clientIds.find(clientId => clientId !== this.id);
const joinRoomId = clientIds.find(clientId => clientId !== roomMakerId);

  if(side === 1){
    sio.to(roomMakerId).emit('side', 0);
    sio.to(joinRoomId).emit('side', 1);  
  } else if(side === 0){
    sio.to(roomMakerId).emit('side', 1);
    sio.to(joinRoomId).emit('side', 0);  
  }
   
}

exports.startGame = startGame