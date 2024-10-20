const express = require('express');
const cookieParser = require('cookie-parser');
const connectToDB = require('./configs/mongo');
const authRoute = require('./routes/auth');

const app = express();
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDB();

// Routes
app.use('/auth', authRoute);
app.get('/', function(req, res) {
    res.send('Welcome to TredeFolioo API!');
})

app.listen(process.env.PORT ?? 3000);