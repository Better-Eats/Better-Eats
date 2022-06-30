const router = require('express').Router();
const USER = require('../db/user_schema.js');
const CAL = require('../db/cal_schema.js');
const fetchAPI = require('../apis/nutrition.js');

/*
example req.body = {
  username: ji1hansol,
  goal: 2000,
  uid: 1321321
}
*/

// login-save user info: username, goal, uid
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

/*
example req.body = {
  uid: 1321321
  date: 06/27/2022
}
*/

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

/*
example req.query = {
  id: 1321321,
  date: 6/27/2022
}
*/

// get user profile (username, calories goal, uid)
router.get('/', (req, res) => {
  USER.find({uid: req.query.id})
    .then((results) => {
      res.status(200).send(results);
    })
    .catch((err) => {
      res.status(500).send(err);
    })
});
//axios.get('users/', {params: {date: new Date(yyyy/mm/dd)}})


/*
example req.query = {
  id: 1321321,
  date: 6/27/2022
}
*/

// get all user nutrients info (calories, carbs, fat, protein, date)
router.get('/info', (req, res) => {
  fetchAPI.getUserInfo(req.query, (response) => {
    res.status(200).send(response);
  });
});

/*
example req.query = {
  id: 1321321
}
*/

// get user historical(add a param for this) and current(default) intakes: uid, date, food item, calories;
router.get('/history', (req, res) => {
  fetchAPI.getUserHistory(req.query, (response) => {
    res.status(200).send(response);
  });
});

router.put('/', (req, res) => {
  // console.log(req.body);
  USER.findOneAndUpdate({uid: req.body.uid}, {goal: req.body.goal})
    .then((results) => {
      res.status(201).send(results);
    })
})

module.exports=router;