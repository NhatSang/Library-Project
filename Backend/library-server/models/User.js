const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"] },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
  role: { type: String, enum: ["admin", "user"] },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
