const router = require('express').Router();
const Cart = require('../db/cart_schema.js');

router.post('/',async (req,res)=>{
  const uid = req.body.uid;
  const order = req.body.order;
  try{
    const isFound = await Cart.find({uid:uid});
    if(isFound.length===0) {
      const newCart = new Cart(req.body)
      const result = await newCart.save();
    } else{
    const result = await Cart.updateOne(
      { uid: uid },
      { $push: { order: order } }
   )
    }
   res.status(201).send('Updated')
  }catch(err){
    res.status(500).send(err);
  }
})

router.post('/empty', async(req, res) => {
  console.log('req', req.body);
  try{
    await Cart.deleteOne({uid: req.body.uid});
    res.status(204).send('deleted');
  }catch(err){
    res.status(500).send(err);
  }

})

router.get('/', (req,res) => {
  console.log('here', req.query.uid );
  Cart.find({uid: req.query.uid})
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    res.status(500).send(err);
  })
} )

module.exports=router;