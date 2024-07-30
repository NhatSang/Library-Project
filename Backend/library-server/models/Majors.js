const mongoose = require("mongoose");

const majorsSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const Majors = mongoose.model("Majors", majorsSchema);
module.exports = Majors;
