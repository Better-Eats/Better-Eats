const mongoose = require('mongoose');
//current cart information
const cartSchema = new mongoose.Schema({
  uid: {
    type: String
  },
  order: {
    type: Array,
    default: []
  }
}, {timestamp: true})

module.exports = mongoose.model('cart', cartSchema);