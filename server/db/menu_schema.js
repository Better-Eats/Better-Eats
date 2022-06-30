const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  name: {
    type: String
  },

  image: {
    type: String
  },

  ingredients: {
    type: Array,
    default: []
  },

  calories: {
    type: Number
  },

  fat: {
    type: Number
  },

  carbohydrates: {
    type: Number
  },

  protein: {
    type: Number
  },

  price: {
    type: Number
  }
})

module.exports = mongoose.model('menu', menuSchema)

