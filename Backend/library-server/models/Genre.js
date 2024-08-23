import mongoose from "mongoose";

const genreScheme = new mongoose.Schema({
  name: { type: String, required: true },
});

const Genre = mongoose.model("Genre", genreScheme);
export default Genre;
