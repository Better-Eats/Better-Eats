const router = require('express').Router();
const fetchAPI = require('../apis/nutrition.js');

// get calories for certain item: FDA
router.get('/', (req, res) => {
  fetchAPI.getFoodID(req.query, (response) => {
    res.status(200).send(response.data);
  });
});

/* example req.body = {
  uid: 1232131,
  fdcid: 321,
  date: 6/27/2022,
  currentTotal: {
    calories: 412,
    carbohydrates: 10,
    fat: 3,
    protein: 4
  }
} */

router.post('/', (req, res) => {
  fetchAPI.getFoodNutrients(req.body, (response) => {
    const labelNutrients = response.data.labelNutrients;
    let data = {
      uid: req.body.uid,
      fdcid: req.body.fdcid,
      date: req.body.date,
      totalCal: Number(req.body.currentTotal.calories) + labelNutrients.calories.value,
      totalCarbs: Number(req.body.currentTotal.carbohydrates) + labelNutrients.carbohydrates.value,
      totalFat: Number(req.body.currentTotal.fat) + labelNutrients.fat.value,
      totalProtein: Number(req.body.currentTotal.protein) + labelNutrients.protein.value,
      foodName: response.data.description,
      calories: labelNutrients.calories.value,
      carbohydrates: labelNutrients.carbohydrates.value,
      fat: labelNutrients.fat.value,
      protein: labelNutrients.protein.value
    };
    fetchAPI.saveNewItem(data, (response) => {
      res.status(201).send('new item saved successfully');
    })
  })
});

module.exports = router;