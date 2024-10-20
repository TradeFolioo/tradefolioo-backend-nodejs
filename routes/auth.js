const express = require('express');
const { registerUser, loginUser, logoutUser, profileUser } = require('../controllers/authController');
const { userCheck } = require('../middlewares/userCheck');

const router = express.Router();

router.get('/', function (req, res) {
    res.send("Welcome to TradeFolioo Auth API");
});

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/profile', userCheck, profileUser);

module.exports = router;