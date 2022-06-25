const router = require('express').Router();
const USER = require('../db/user_schema.js')

// login-save user info: uid, name, email
router.post('/', async (req, res) => {
  const newUser = new USER(req.body)
  try {
   const savedU = await newUser.save();
    res.status(201).send(savedU)
  }catch(err){
    res.status(500).send(err)
  }
})

// get user historical(add a param for this) and current(default) intakes: uid, date, food item, calories;
router.get('/intake/:uid', (req, res) => {

})

// post user intakes for today: uid, date, food item, calories
router.post('/intake', (req, res) => {

})

module.exports=router;