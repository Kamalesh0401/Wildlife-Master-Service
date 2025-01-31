const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://TestUser:Test0401@cluster0.eqlho.mongodb.net/wildlife-explorer?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("Database Connection Error:", error);
        process.exit(1);
    }
};

module.exports = connectDB;
