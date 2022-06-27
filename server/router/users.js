const router = require('express').Router();
const USER = require('../db/user_schema.js');
const CAL = require('../db/cal_schema.js');

// login-save user info: uid, name, email
router.post('/newUser', async (req, res) => {
  const newUser = new USER(req.body)
  try {
   const savedU = await newUser.save();
   const newDoc = await new CAL({uid: savedU.uid, date: savedU.date});
   const savedDoc = await newDoc.save();
    res.status(201).send(savedU);
  } catch(err){
    res.status(500).send(err);
  }
});

// new cal doc for when midnight passes
router.post('/newDay', async (req, res) => {
  try {
    const newDoc = await new CAL({uid: req.body.uid, date: req.body.date});
    const savedDoc = await newDoc.save();
    res.status(201).send(savedDoc);
  } catch(err) {
    res.status(500).send(err);
  }
});

// get user historical(add a param for this) and current(default) intakes: uid, date, food item, calories;
router.get('/intake/:uid', (req, res) => {

});

module.exports=router;