const express = require('express');
const connectToDB = require('./configs/mongo');

const app = express();
require('dotenv').config();

connectToDB();

app.get('/', function(req, res) {
    res.send('Welcome to TredeFolioo API!');
})

app.listen(process.env.PORT ?? 3000);