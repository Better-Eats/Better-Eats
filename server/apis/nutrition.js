const axios = require('axios');
const CAL = require('../db/cal_schema.js');

let options = {
  url: 'https://api.nal.usda.gov/fdc/v1',
  header: {'X-Api-Key': 'TMBxIcfhLagZebhjLgri8KbvtGLfHS8m5a0MCOMA'}
}

module.exports = {
  getFoodID: (data, cb) => {
    axios.get(`${options.url}/foods/search`, {headers: options.header, params: {query: data.query, dataType: data.dataType, pageSize: 5}})
      .then(cb)
      .catch((err) => {
        console.log('error retrieving the fdcid from api');
      })
  },

  getFoodNutrients: (data, cb) => {
    const fdcid = data.id;
    axios.get(`${options.url}/food/${fdcid}`, {headers: options.header})
      .then(cb)
      .catch((err) => {
        console.log('error retrieving the nutrients from api');
      })
  },

  saveNewItem: async (data, cb) => {
    try {
      const newDoc = new CAL({uid: data.uid, date: data.date});
      const savedI = await CAL.findOneAndUpdate(
        {
          uid: data.uid, date: data.date
        },
        {
          $set: {totalcal: data.totalCal, totalCarbs: data.totalCarbs, totalFat: data.totalFat, totalProtein: data.totalProtein},
          $push: {items: {foodName: data.foodName, calories: data.calories, carbohydrates: data.carbohydrates, fat: data.fat, protein: data.protein}}
        },
        {
          returnDocument: 'after',
          upsert: true
        })
      cb(savedI);
    } catch(err) {
      console.log('error updating new item', err);
    }
  }
}
