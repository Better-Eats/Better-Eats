const axios = require('axios');
const CAL = require('../db/cal_schema.js');
const GROC = require('../db/grocery_schema.js');

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
      const userH = await CAL.find({uid: data.id}, null, {limit: data.limit, sort: {date: 1}});
      cb(userH);
    } catch(err) {
      console.log('error retrieving user history', err);
    }
  },

  getGroceryItems: async (data, cb) => {
    try {
      const groceryItems = await GROC.find({}, null, {limit: data.limit})
      cb(groceryItems);
    } catch(err) {
      console.log('error getting grocery items', err);
    }
  },

  addToDb: (cb) => {
    axios.get(`${options.url}/foods/search`, {headers: options.header, params: {dataType: 'Branded', pageSize: 200}})
      .then((results) => {
        const foodIds = [];
        results.data.foods.forEach((item) => {
          foodIds.push(item.fdcId);
        })
        return foodIds;
      })
      .then((list) => {
        let searchString = list.slice(180, 200);
        axios.get(`${options.url}/foods`, {headers: options.header, params: {fdcIds: searchString.join(',')}})
          .then((res) => {
            res.data.forEach((item) => {
              if (Object.keys(item.labelNutrients).length < 3 || item.brandName === 'Farmland') {
                return;
              }
              let data = {
                description: item.description,
                brandName: item.brandName,
                servingSize: item.servingSize + item.servingSizeUnit,
                ingredients: item.ingredients,
                fat: item.labelNutrients.fat.value,
                carbohydrates: item.labelNutrients.carbohydrates.value,
                protein: item.labelNutrients.protein.value,
                calories: item.labelNutrients.calories.value
              };
              // results.push(data);
              const groceryItem = new GROC(data);
              // console.log(item.labelNutrients);
              groceryItem.save()
                .then(() => {
                  console.log('saved');
                })
                .catch((err) => {
                  console.log('error while saving', err);
                })
            })
          })
      })
      .then(() => {
        cb('passed');
      })
      .catch((err) => {
        console.log('error at add to db', err);
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
