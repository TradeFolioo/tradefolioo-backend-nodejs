const express = require('express');

const router = express.Router();

router.get('/', function (req, res) {
    res.send("Welcome to TradeFolioo Auth API");
});

router.post('/login', function (req, res) {
    res.send("Login endpoint");
});

router.post('/register', function (req, res) {
    res.send("Register endpoint");
});

module.exports = router;