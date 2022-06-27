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
        console.log(err);
        console.log('error at fdcid api');
      })
  },

  getFoodNutrients: (data, cb) => {
    const fdcid = data.id;
    axios.get(`${options.url}/foods/${fdcid}`)
      .then(cb)
      .catch((err) => {
        console.log('error at nutrients api');
      })
  },

  saveNewItem: async (data, cb) => {
    try {
      const savedI = await db.bettereats.findOneAndUpdate(
        {
          uid: data.uid, date: data.date
        },
        {
          $set: {totalcal: data.totalcal},
          $push: {items: {foodName: data.foodName, calories: data.calories, carbohydrates: data.carbohydrates, fat: data.fat, protein: data.protein}}
        },
        {
          returnDocument: 'after',
          upsert: true
        })
      cb(err, savedI);
    } catch(err) {
      cb(err);
    }
  },

  // getTotalCalories: async (data, cb) => {
  //   try {
  //     const userInfo = await db.bettereats.find({uid: data.uid});
  //     cb(err, userInfo);
  //   } catch(err) {
  //     cb(err);
  //   }
  // }
}
