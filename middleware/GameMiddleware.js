const Room = require('../models/roomModel');

const checkUserInRoom = async (req, res, next) => {
  const roomID = req.params.roomID;
  const userID = req.params.userID;
  try {
    const room = await Room.findOne({ name: roomID });
    console.log(userID)
    console.log(roomID)
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    if (room.users.includes(userID)) {
      next();
    } else {
      return res.status(403).json({ message: 'User is not in the room' });
    }
  } catch (error) {
    console.error('Error checking user in room:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = checkUserInRoom;
