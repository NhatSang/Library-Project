import mongoose from "mongoose";

// Schema lưu trữ mã xác nhận
const verificationCodeSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    code: { type: String, required: true },
    expireAt: { type: Date, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const VerificationCode = mongoose.model(
  "VerificationCode",
  verificationCodeSchema
);

export default VerificationCode