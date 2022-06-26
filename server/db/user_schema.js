const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: {
    type: String
  },
  goal: {
    type: Number
  },
  uid: {
    type: String
  }

});

module.exports = mongoose.model('user', userSchema);