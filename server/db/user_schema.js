const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  goal: {
    type: Number
  },
  date: {
    type: Date
  },
  uid: {
    type: String
  }
}, {timestamp: true});

module.exports = mongoose.model('user', userSchema);