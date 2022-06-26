const router = require('express').Router();
const fetchAPI = require('../apis/nutrition.js');

// get calories for certain item: FDA
router.get('/', (req, res) => {
  fetchAPI.getFoodID(req.body, (response) => {
    res.send(response);
  });
});

/*

router.post('/', (req, res) => {
  fetchAPI.getFoodNutrients(req.body, (response) => {
    res.send(response);
  })
})

*/





module.exports = router;