const router = require('express').Router();
const fetchAPI = require('../apis/nutrition.js');

// get calories for certain item: FDA
router.get('/', (req, res) => {
  fetchAPI.getFoodID(req.query, (response) => {
    res.send(response.data);
  });
});

//req.body = {id: 321, date: fse, currentTotal: 412}
router.post('/', (req, res) => {
  fetchAPI.getFoodNutrients(req.body.id, (response) => {
    let data = {
      uid: req.body.id,
      date: req.body.date,
      totalcal: currentTotal + response.labelNutrients.calories,
      foodName: response.description,
      calories: response.labelNutrients.calories,
      carbohydrates: response.labelNutrients.carbohydrates,
      fat: response.labelNutrients.fat,
      protein: response.labelNutrients.protein
    };
    fetchAPI.saveNewItem(data, (response) => {
      res.send(response);
    })
  })
});





module.exports = router;