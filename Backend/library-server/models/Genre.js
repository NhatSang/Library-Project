const mongoose = require("mongoose");

const genreScheme = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreScheme);
module.exports = Genre;
