require('dotenv').config();
const app = express();
const express = require('express');
const axios = require('axios');
const router = require('./router');

app.use(express.json());

app.use('/users', router.users);
app.use('/cal', router.cal);
app.use('/menu', router.menu);
app.use('/forum', router.forum)


// place an order




const {PORT} = process.env.PORT;
app.listen(PORT,() => { console.log(`Server running on port ${PORT}...`); },);