import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"] },
  dob: { type: Date, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
  role: { type: String, enum: ["admin", "user"] },
  active: { type: Boolean, default: true },
  studentCode: { type: String },
  studentYear: { type: Number },
  image: { type: String, default: 'https://pdf8888.s3.ap-southeast-1.amazonaws.com/avata_default.jpg' },
});

const User = mongoose.model("User", userSchema);
export default User;
