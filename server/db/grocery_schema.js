const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
  description: {
    type: String
  },

  brandName: {
    type: String
  },

  servingSize: {
    type: String
  },

  ingredients: {
    type: String
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

  calories: {
    type: Number
  }
});


module.exports = mongoose.model('grocery', grocerySchema);