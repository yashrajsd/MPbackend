const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const dbConnect = require('./db')
const checkUserInRoom = require('./middleware/GameMiddleware')
var bodyParser = require('body-parser')

const Room = require('./models/roomModel')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// db connection 
dbConnect()
// db connection 


// import api routes 
const userRoutes = require("./routes/User");
const rankRoutes = require("./routes/Rank");
// mount api routes 
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/rank", rankRoutes);


// Socket 
const serverSocket = require('./socket');
const SocketRoom = require('./room'); 
const rooms = new SocketRoom(); 
serverSocket(httpServer, rooms); 
// Socket


httpServer.listen(PORT, () => {
  console.log('Server Listening to PORT: ' + PORT);
});

// api
app.get('/api/room/:roomId/:userID', async (req, res) => {
  try {
    const roomId = req.params.roomId;

    const room = await Room.findOne({ name: roomId });

    if (!room) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.json({ room });
  } catch (error) {
    console.error('Error getting room information:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Api to start game
app.post('/api/room/:roomID/start-game', async (req, res) => {
  try {
    const roomId = req.params.roomID;
    const updatedRoom = await Room.findOneAndUpdate(
      { name: roomId },
      { $set: { waiting: false } },
      { new: true }
    );

    if (!updatedRoom) {
      return res.status(404).json({ message: 'Room not found.' });
    }

    res.json(updatedRoom);
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
