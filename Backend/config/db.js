const mongoose = require("mongoose");
const connectDB = async () =>{
    try{
        if (!process.env.MONGO_URL) {
            console.error("ERROR: MONGO_URL is not defined in your .env file.");
            process.exit(1);
        }

        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB Connected");

    }catch(err){
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;