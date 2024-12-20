const bcrypt = require('bcrypt');
const userModel = require('../models/user');
const generateToken = require('../utils/generateTokens');

module.exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        let user = await userModel.findOne({ email });
        if (user) {
            return res.status(400).send({ message: 'User already exists' });
        }

        let salt = await bcrypt.genSalt();
        let hashPassword = await bcrypt.hash(password, salt);

        user = await userModel.create({ name: name, email: email, password: hashPassword });

        let token = generateToken({ email });

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days 
        });

        user = await userModel.findOne({ email: email }).select("-password");
        const addToken = { token: token };
        user = { ...user._doc, ...addToken };
        // console.log(user);
        res.status(201).send(user);
    } catch (error) {
        res.status(500).send({ messgae: error.message });
    }

};
module.exports.loginUser = async (req, res) => { 
    try{
        const { email, password } = req.body;

        let user = await userModel.findOne({ email: email });

        if(!user){
            res.status(404).send({ message: "User not found"});
        }
        else {
            let passwordResult = await bcrypt.compare(password, user.password);
            if(passwordResult){
                let token = generateToken({ email });

                res.cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    maxAge: 30 * 24 * 60 * 60 * 1000, // expires in 30 days
                });
                
                user = await userModel.findOne({ email: email }).select("-password");
                const addToken = { token: token };
                user = { ...user._doc, ...addToken };
                // console.log(user);
                res.status(200).send(user);
            }
            else{
                res.status(401).send({ message: "Invalid credentials" });
            }
        }
    }
    catch(error){
        res.status(500).send({ message: error.message });
    }
};
module.exports.logoutUser = (req, res) => { 
    res.cookie("token", "", {
        httpOnly: true,
        secure: true,
    })

    res.status(201).send({ message: "User logged out successfully"});
};
module.exports.profileUser = (req, res) => { 
    res.status(200).send(req.user);
};

module.exports.updateProfile = async (req, res) => {
    // res.status(200).send(req.user);
    const { profileImage, bio, name } = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, { $set: {'name': name, 'profileImage': profileImage, 'bio': bio}}, { new: true }).select("-password");
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}