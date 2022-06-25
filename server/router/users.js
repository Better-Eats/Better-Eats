const router = require('express').Router();
const models = require('../models')
// login-save user info: uid, name, email
router.post('/', (req, res) => {

})

// get user historical(add a param for this) and current(default) intakes: uid, date, food item, calories;
router.get('/intake/:uid', (req, res) => {

})

// post user intakes for today: uid, date, food item, calories
router.post('/intake', (req, res) => {

})