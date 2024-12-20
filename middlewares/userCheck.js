const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
module.exports.userCheck = async(req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    
    if(req.cookies.token || token) {
        try {
            // gives the email
            const data = jwt.verify(req.cookies.token || token, process.env.JWT_SECRET);
            // get the user details and remove password field
            req.user = await userModel.findOne({ email: data.email }).select("-password");

            next();
        } catch (error) {
            res.status(401).send(error.message);
        }
    }
    else{
        res.status(401).send({ messgage: "Not authorized, you don't have permission to access" })
    }
}