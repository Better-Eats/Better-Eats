require('dotenv').config();
const express = require('express');
const app = express();
const axios = require('axios');
const {PORT} = process.env
app.use(express.json());




app.listen(PORT,() => { console.log(`Server running on port ${PORT}...`); },);