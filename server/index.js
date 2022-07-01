require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const router = require('./router');
const mongoose = require("mongoose");

app.use(express.json());


//routes
app.use('/users', router.users);
app.use('/yelp', router.yelp);
app.use('/cal', router.cal);
app.use('/menu', router.menu);
// app.use('/forum', router.forum)
app.use('/cart', router.cart);
app.use('/gro', router.gro);

// place an order



//database
mongoose.connect(process.env.MONGO_DB, ()=> {
  console.log("Database is connected")
});

//port
const PORT = process.env.PORT || 3001;
app.listen(PORT,() => { console.log(`Server running on port ${PORT}...`); },);