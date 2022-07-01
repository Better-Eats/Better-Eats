const router = require('express').Router();
const Gro = require('../db/grocery_schema.js');
router.get('/', async (req, res) => {
  try{
    const result = await Gro.find();
    res.status(200).send(result);
  }catch(err){
    res.status(500).send(err);
  }
})

module.exports=router;