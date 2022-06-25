const mongoose = require('mongoose');

const calSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  items: {
    type: Array,
    default: []
  },
  totalcal: {
    type: Number
  },
  date:{
    type: Date
  }
}, {timestamp: true})

module.exports = mongoose.model('cal', calSchema);