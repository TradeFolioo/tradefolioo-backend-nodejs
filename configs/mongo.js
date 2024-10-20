const mongoose = require('mongoose');

// Connect to MongoDB
const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB!!");
        
    } catch (error) {
        console.error("Error connecting to MongoDB \n", error);
        process.exit(1);
    }
}

module.exports = connectToDB;