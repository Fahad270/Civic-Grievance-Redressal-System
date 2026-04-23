const mongoose = require("mongoose");

//This file is used ot to connect our backend with MongoDB 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;