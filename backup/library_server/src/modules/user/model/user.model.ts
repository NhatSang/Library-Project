import mongoose from "mongoose";
import { Gender, Role, UserStatus } from "../types/user.type";

const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    gender: { type: String, enum: [Gender.Male, Gender.Female] },
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
