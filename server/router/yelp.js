const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res) => {
<<<<<<< HEAD
  const {lat, lng} = req.body;

  try {
    const restas = await axios.get(`${process.env.YELP_URL}?latitude=${lat}&longitude=${lng}`, {headers: {
      Authorization: `Bearer ${process.env.YELP}`}})
=======
  const {lat, lng} = req.body.coordinates;
  const ordertype = req.body.ordertype === 'gro' ? 'grocery': '';
  try{
    const restas = await axios.get(`${process.env.YELP_URL}?term=${ordertype}&latitude=${lat}&longitude=${lng}`, {headers: {
      Authorization: `Bearer ${process.env.YELP}`}});
>>>>>>> 3264ab39d46171282a8a0079596b75362ff31bc4
    res.status(200).send(restas.data);
  } catch(err){
  res.status(500).send(err)
}
});

router.post('/details', async (req, res) => {
  const {id} = req.body;
  try{
    const det = await axios.get(`https://api.yelp.com/v3/businesses/${id}`, {headers: { Authorization: `Bearer ${process.env.YELP}`}});
    res.status(200).send(det.data);
    } catch(err) {
      res.status(500).send(err)
    }
});

module.exports = router;