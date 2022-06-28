const router = require('express').Router();
const menuAi = require('../apis/menu.js');
const fetchAPI = require('../apis/nutrition.js');

// // get menus from restaurant
// router.get('/', (req, res) => {

// });

// get items from groceries
router.get('/', (req, res) => {
  fetchAPI.getGroceryItems((response) => {
    res.status(200).send(response);
  });

});


module.exports = router;