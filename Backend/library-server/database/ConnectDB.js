const mongoose = require("mongoose");

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Failed to connect MongoDB: ", err.message);
  }
};

module.exports = ConnectDB;
