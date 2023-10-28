const { Server} = require('socket.io')
const Room = require('./models/roomModel');

function serverSocket(server,rooms){
    const io = new Server(server,{
        cors:{
          origin:"http://localhost:3000",
          methods:['GET',"POST"]
        }
      })
      const socketToRoomUserMap = new Map();

      io.on('connection', (socket) => {
        console.log('User Connected');
    
        socket.on('disconnect', () => {
          console.log('User disconnected');
          if (socketToRoomUserMap.has(socket.id)) {
            const { roomId, userId } = socketToRoomUserMap.get(socket.id);
            io.to(roomId).emit('userLeft', userId);
            rooms.leaveRoom(roomId);
            socketToRoomUserMap.delete(socket.id);
          }
        });

        // canvas data handling below
        socket.on('drawing', (data) => socket.broadcast.emit('drawing', data))

        // starting game logic below
        socket.on('gameStarted',(roomID)=>{
          console.log('socket recieved in room:'+roomID)
          io.to(roomID).emit('startGame')
        })

        socket.on('createRoom',()=>{
            const roomId = rooms.createRoom();
            socket.join(roomId)
            io.to(roomId).emit('roomCreated', roomId);
        })

        socket.on('findRoom', async (userID) => { 
          const roomId = rooms.findRoom();
          if (roomId) {
            const joinedRoomId = rooms.joinRoom(roomId);
            if (joinedRoomId) {
              try {
                const updatedRoom = await Room.updateOne({ name: roomId }, { $push: { users: userID } });
                socket.join(roomId)
                console.log('working correctly');
                if (updatedRoom) {
                  console.log('working correctly');
                  console.log(`User ${userID} joined room ${roomId}`);
                  socketToRoomUserMap.set(socket.id, { roomId, userID });
                  io.to(socket.id).emit('roomFound', roomId);
                  console.log('User joined');
                } else {
                  socket.emit('roomError', 'Room is full or does not exist');
                }
              } catch (error) {
                socket.emit('roomError', "Room wasn't created successfully");
                console.error('Error updating room document:', error);
              }
            }
          }
        });
        
        socket.on('joinRoom', async(roomID, userID) => {
          console.log(roomID)
          const joinedRoomId = rooms.joinRoom(roomID);
          console.log(joinedRoomId)
          if (joinedRoomId) {
            socket.join(joinedRoomId);
            socketToRoomUserMap.set(socket.id, { roomID, userID });
            try {
              const updatedRoom = await Room.updateOne({ name: roomID }, { $push: { users: userID } });
                console.log(`User ${userID} joined room ${roomID}`);
                io.to(joinedRoomId).emit('userJoined', roomID);
                console.log('User connected to roomID: ' + roomID);
                
            } catch (error) {
              socket.emit('roomError', 'Room is full or does not exist');
              console.error('Error updating room document:', error);
            }
          } else {
            socket.emit('roomError', 'Room is full or does not exist');
          }
        });
        
    })
}


module.exports = serverSocket;