const router = require('express').Router();
const menuAi = require('../apis/menu.js');
const fetchAPI = require('../apis/nutrition.js');

// // get menus from restaurant
// router.get('/', (req, res) => {

// });

// get items from groceries. Default is 20 items returned.
router.get('/', (req, res) => {
  let data = req.query
  if (req.query.limit === 'undefined') {
    data = {limit: 20};
  }
  console.log(req.query);
  fetchAPI.getGroceryItems(data, (response) => {
    res.status(200).send(response);
  });

});

router.get('/database', (req, res) => {
  fetchAPI.addToDb((response) => {
    res.send('added to db');
  })
});

router.get('/items', (req, res) => {
  menuAi.getAll((response) => {
    res.send(response);
  })
});


module.exports = router;