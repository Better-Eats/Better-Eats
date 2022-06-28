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

  getUserInfo: async (data , cb) => {
    try {
      const userI = await CAL.find({uid: Number(data.id), date: data.date})
      cb(userI);
    } catch(err) {
      console.log('error retrieving user info', err);
    }
  },

  getUserHistory: async (data, cb) => {
    try {
      const userH = await CAL.find({uid: Number(data.id)}, null, {limit: data.limit, sort: {date: 1}});
      cb(userH);
    } catch(err) {
      console.log('error retrieving user history', err);
    }
  },

  getGroceryItems: async (cb) => {
    const foundationItems = await axios.get(`${options.url}/foods/search`, {headers: options.header, params: {dataType: 'Foundation', pageSize: 10}});

    // const brandedItems = await axios.get(`${options.url}/foods/search`, {headers: options.header, params: {dataType: 'Branded', pageSize: 20}});

    const promiseArray = [];
    promiseArray.push(foundationItems);
    // promiseArray.push(brandedItems);
    return Promise.all(promiseArray)
      .then((data) => {
        const allIDs = [];
        data.forEach((category) => {
          const foods = category.data.foods;
          foods.forEach((item) => {
            allIDs.push(item.fdcId);
          })
        });
        return allIDs;
      })
      .then((ids) => {
        let index = 0;
          axios.get(`${options.url}/foods`, {headers: options.header, params: {fdcIds: ids.join(',')}})
            .then((res) => {
              const results = [];
              results.push(res.data);
              return results;
            })
            .then((results) => {
              console.log('results', results[0].length);
              cb(results);
            })
            .catch((err) => {
              console.log(err);
            })
      })
      .catch((err) => {
        console.log('error retrieving grocery items');
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
