const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  users: [{ type: String }],
  rounds: { type: Number, default: 1 },
  waiting: { type: Boolean, default: true },
  riddlesChecked:{ type: Array, default:[]},
  riddleObj:{ type: Object, default:{}}
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
