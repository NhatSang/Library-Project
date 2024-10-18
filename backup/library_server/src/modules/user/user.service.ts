import bcrypt from "bcryptjs";
import { Service } from "typedi";
import { UserRegisterDTO } from "./dto/user.dto";
import User from "./model/user.model";
import { Errors } from "../../helper/error";
import { sendVerificationCode } from "../../bullMQ/email/email.utils";
import VerificationCode from "./model/verification.model";

@Service()
export class UserService {
  async register(params: UserRegisterDTO) {
    const { email, password, repassword, name, gender, dob, majors, code } =
      params;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      if (existingUser.status == "pending") {
        await sendVerificationCode(email);
        return email;
      } else throw Errors.userExists;
    }
    if (password !== repassword) throw Errors.invalidRepassword;
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      email: email,
      password: hashPass,
      code: code,
      dob: dob,
      gender: gender,
      name: name,
      majors: majors,
    });
    await newUser.save();
    await sendVerificationCode(email);
    return email;
  }
  async verifyEmail(params: any) {
    const { email, code } = params;
    const session = await User.startSession();
    try {
      session.startTransaction();

      const existingUser = await User.findOne({
        email: email,
        status: "unverify",
      }).session(session); 

      if (!existingUser) throw Errors.userNotExists;

      const storedCode = await VerificationCode.findOne({
        email: email,
        code: code,
        status: true,
      }).session(session); 

      if (!storedCode) throw Errors.invalidCode;
      if (new Date() > storedCode.expireAt) throw Errors.expiredCode;

      await existingUser.updateOne({ status: "active" }, { session }); 
      await storedCode.updateOne({ status: false }, { session }); 

      await session.commitTransaction();
      return existingUser;
    } catch (error) {
      await session.abortTransaction();
      throw error; 
    } finally {
      session.endSession();
    }
  }
}
