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
    type: Number,
    default: 0
  },

  totalCarbs: {
    type: Number,
    default: 0
  },

  totalFat: {
    type: Number,
    default: 0
  },

  totalProtein: {
    type: Number,
    default: 0
  },

  date:{
    type: Date
  }
}, {timestamp: true})

const CAL = mongoose.model('cal', calSchema);

module.exports = CAL;