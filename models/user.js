const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'https://placehold.co/300x300/EEE/31343C?font=playfair-display&text=TradeFolioo'
    },
    bio: {
        type: String,
        default: "I'm new to TradeFolioo!"
    }
});

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;