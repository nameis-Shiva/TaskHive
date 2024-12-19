const mongoose = require("mongoose");
const {config} = require("dotenv");
config();

let url = process.env.MONGO_URI;
const dbConnect = async () => {
    try {
        await mongoose.connect(url);
        console.log("Database Connected.......👍")
    } catch (error) {
        console.log("DB connection Error" + error.message)
    }
}

module.exports = dbConnect;
