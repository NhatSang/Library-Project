import mongoose from "mongoose";
import { Gender, Role, UserStatus } from "../types/user.type";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, index: true },
    gender: {
      type: String,
      enum: [Gender.Male, Gender.Female],
      default: Gender.Male,
    },
    dob: { type: Date },
    email: { type: String, required: true },
    password: { type: String, required: true },
    majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
    role: { type: String, enum: [Role.Admin, Role.User], default: Role.User },
    status: {
      type: String,
      enum: [
        UserStatus.Banned,
        UserStatus.Deleted,
        UserStatus.Active,
        UserStatus.Pending,
      ],
      default: UserStatus.Pending,
    },
    code: { type: String, index: true },
    image: {
      type: String,
      default:
        "https://pdf8888.s3.ap-southeast-1.amazonaws.com/avata_default.jpg",
    },
  },
  { timestamps: true }
);
userSchema.index({ email: 1, status: 1 });
const User = mongoose.model("User", userSchema);
export default User;
