import bcrypt from "bcryptjs";
import { Service } from "typedi";
import { UserRegisterDTO, UserResponseDTO } from "./dto/user.dto";
import User from "./model/user.model";
import { Errors } from "../../helper/error";
import { sendVerificationCode } from "../../bullMQ/email/email.utils";
import VerificationCode from "./model/verification.model";
import { Pagination } from "../../helper/pagination";
import { Role, UserStatus } from "./types/user.type";
import mongoose from "mongoose";
import { FilterQuery } from "mongoose";

@Service()
export class UserService {
  async register(params: UserRegisterDTO) {
    return null;
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

      await existingUser.updateOne({ status: UserStatus.Active }, { session });
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

  async checkExistedUser(userId: string) {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
    if (!user) {
      throw Errors.userNotExists;
    }
    return user;
  }

  async banUser(userId: string) {
    const user = await this.checkExistedUser(userId);
    let setStage = {};
    setStage =
      user.status == UserStatus.Banned
        ? { status: UserStatus.Active }
        : { status: UserStatus.Banned };
    await User.updateOne(
      { _id: new mongoose.Types.ObjectId(userId) },
      setStage
    );
    return true;
  }

  async findUserByKeyword(keyword: string, pagination: Pagination) {
    const { getOffset, limit } = pagination;
    const matchStage: FilterQuery<any> = {
      status: { $in: [UserStatus.Active, UserStatus.Banned] },
      role: Role.User,
    };
    if (keyword) {
      matchStage.$or = [
        { name: { $regex: keyword, $options: "i" } },
        { code: { $regex: keyword, $options: "i" } },
      ];
    }
    const [users, total] = await Promise.all([
      User.find(matchStage).skip(getOffset()).limit(limit),
      User.countDocuments(matchStage),
    ]);
    pagination.total = total;
    const transformedList = UserResponseDTO.transformUser(users);
    return { users: transformedList, pagination };
  }
}
