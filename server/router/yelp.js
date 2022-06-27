const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const {lat, lng} = req.body;

  try{
    const restas = await axios.get(`${process.env.YELP_URL}?latitude=${lat}&longitude=${lng}`, {headers: {
      Authorization: `Bearer ${process.env.YELP}`}})
    res.status(200).send(restas.data);
  }catch(err){
  res.status(500).send(err)
}
})

module.exports = router;