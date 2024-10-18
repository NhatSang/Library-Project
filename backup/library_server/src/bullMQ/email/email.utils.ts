import crypto from "crypto";
import { emailQueue } from "./email.queue";
import VerificationCode from "../../modules/user/model/verification.model";
import { Errors } from "../../helper/error";

export const sendVerificationCode = async (email: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const attemptsToday = await VerificationCode.countDocuments({
    email,
    createdAt: { $gte: today },
  });
  if (attemptsToday > 5) {
    throw Errors.tooManyRequest;
  }
  const verificationCode = crypto.randomBytes(2).toString("hex").toUpperCase();
  const expireAt = new Date();
  expireAt.setMinutes(expireAt.getMinutes() + 1);
  const newCode = new VerificationCode({
    email,
    code: verificationCode,
    expireAt,
  });
  await newCode.save();
  await emailQueue.add("sendEmail", {
    email: email,
    subject: "Verification Code",
    content: verificationCode,
  });
};
