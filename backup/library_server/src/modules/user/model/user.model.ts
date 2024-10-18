import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String, enum: ["Male", "Female"] },
    dob: { type: Date },
    email: { type: String, required: true },
    password: { type: String, required: true },
    majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    status: {
      type: String,
      enum: ["baned", "deleted", "active", "pending"],
      default: "pending",
    },
    code: { type: String },
    image: {
      type: String,
      default:
        "https://pdf8888.s3.ap-southeast-1.amazonaws.com/avata_default.jpg",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
