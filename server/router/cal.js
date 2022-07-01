const router = require('express').Router();
const fetchAPI = require('../apis/nutrition.js');
const Cal = require('../db/cal_schema.js')
/*
req.query = {
  query: frosted flakes,
  dataType: Branded
}
*/

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

// post new item into dashboard
router.post('/', (req, res) => {
  fetchAPI.getFoodNutrients(req.body, (response) => {
    const labelNutrients = response.data.labelNutrients;
    const data = {
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

// post custom item into dashboard
router.post('/customitem', (req, res) => {
  const data = {
    uid: req.body.uid,
    date: req.body.date,
    totalCal: req.body.totalCal,
    totalCarbs: req.body.totalCarbs,
    totalFat: req.body.totalFat,
    totalProtein: req.body.totalProtein,
    foodName: req.body.foodName,
    calories: req.body.calories,
    carbohydrates: req.body.carbohydrates,
    fat: req.body.fat,
    protein: req.body.protein
  }
  fetchAPI.saveNewItem(data, (response) => {
    res.status(201).send('new custom item saved successfully');
  })
});

router.post('/cart', async(req, res) => {
  const id = req.body.uid;
  const date = req.body.date;
  console.log("id", id);
  try{
    const isFound = await Cal.find({uid: id, date: date});
    if (isFound.length === 0) {
      const newCal = new Cal(req.body);
      try {
        await newCal.save();
      } catch(err){
        console.log(err);
      }
    } else {
      await Cal.findOneAndUpdate({uid:id, date:date},{$inc:{totalcal: req.body.totalcal, totalCarbs: req.body.totalCarbs, totalFat:req.body.totalFat, totalProtein:req.body.totalProtein}})
      await Cal.updateOne({uid:id, date:date}, {$push: {"items": {$each: req.body.items}}});
    }
    res.status(201).send('Updated');
  }catch(err){
    res.status(500).send(err);
  }
});

module.exports = router;