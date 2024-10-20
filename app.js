const express = require('express');
const connectToDB = require('./configs/mongo');
const authRoute = require('./routes/auth');

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectToDB();

// Routes
app.use('/auth', authRoute);
app.get('/', function(req, res) {
    res.send('Welcome to TredeFolioo API!');
})

app.listen(process.env.PORT ?? 3000);