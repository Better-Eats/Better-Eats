const router = require('express').Router();
const axios = require('axios');

router.post('/', async (req, res) => {
  const {lat, lng} = req.body.coordinates;
  const ordertype = req.body.ordertype === 'gro' ? 'grocery': '';
  try{
    const restas = await axios.get(`${process.env.YELP_URL}?term=${ordertype}&latitude=${lat}&longitude=${lng}`, {headers: {
      Authorization: `Bearer ${process.env.YELP}`}});
    const bus = restas.data.businesses;
    for(item of bus){
      try {
        const is_open_now = await axios.get(`https://api.yelp.com/v3/businesses/${item.id}`, {headers: {
          Authorization: `Bearer ${process.env.YELP}`}});
        item['open_now'] = is_open_now.data.hours[0].is_open_now;
        console.log('open data', is_open_now.data.hours[0].is_open_now);
      } catch(err) {
        console.log(err);
      }
    }
    res.status(200).send(restas.data);
  } catch(err){
  res.status(500).send(err)
}
})

module.exports = router;