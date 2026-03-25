const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(
            "mongodb://mongodb2005:sac2026@mongodb:27017/yearbook?authSource=admin"
        );
        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error(error);
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
};

module.exports = connectDB;
