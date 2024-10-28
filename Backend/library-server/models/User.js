import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female"] },
  dob: { type: Date },
  email: { type: String, required: true },
  password: { type: String, required: true },
  majors: { type: mongoose.Schema.Types.ObjectId, ref: "Majors" },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  active: { type: Boolean, default: true },
  code: { type: String},
  image: {
    type: String,
    default:
      "https://pdf8888.s3.ap-southeast-1.amazonaws.com/avata_default.jpg",
  },
  notifications: [
    {
      notification: {type:mongoose.Schema.Types.ObjectId, ref: "Notification"},
      isRead: {type: Boolean, default: false}
    }
  ],
  devices:[
    {
      device_id: {type: String},
      fcm_token: {type: String},
      platform: {type: String}
    }
  ]
});

const User = mongoose.model("User", userSchema);
export default User;
