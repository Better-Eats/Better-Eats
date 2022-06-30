require('dotenv').config();
const axios = require('axios');
const MENU = require('../db/menu_schema.js');

module.exports = {
  getItems: (cb) => {
    axios.get('https://api.edamam.com/api/recipes/v2', {params: {
      app_id: process.env.EDEMAM_APP_ID,
      app_key: process.env.EDEMAM_APP_KEY,
      type: 'public',
      q: 'spicy'
    }})
      .then((results) => {
        for (let i = 0; i < 5; i++) {
          const recipe = results.data.hits[i].recipe;
          const ingredients = []
          for (let j = 0; j < recipe.ingredients.length; j++) {
            ingredients.push(recipe.ingredients[j].food);
          }
          const price = Math.floor(Math.random() * (1800 - 800) + 800) / 100;
          let data = {
            name: recipe.label,
            image: recipe.image,
            ingredients: ingredients,
            calories: Math.round(recipe.totalNutrients.ENERC_KCAL.quantity / recipe.yield),
            fat: Math.round(recipe.totalNutrients.FAT.quantity / recipe.yield),
            carbohydrates: Math.round(recipe.totalNutrients.CHOCDF.quantity / recipe.yield),
            protein: Math.round(recipe.totalNutrients.PROCNT.quantity / recipe.yield),
            price: price
          }
          const menuItem = new MENU(data);
          menuItem.save()
            .then(() => {
              console.log('saved');
            })
            .catch((err) => {
              console.log('error saving', err);
            })
        }
      })
  },

  getAll: (cb) => {

  }
}



