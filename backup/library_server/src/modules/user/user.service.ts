import { Service } from "typedi";
import { UserResponseDTO } from "./dto/user.dto";
import User from "./model/user.model";
import { Errors } from "../../helper/error";
import { Pagination } from "../../helper/pagination";
import { Role, UserStatus } from "./types/user.type";
import mongoose from "mongoose";
import { FilterQuery } from "mongoose";
import Majors from "../majors/model/majors.model";

@Service()
export class UserService {
  async getUserById(userId: string) {
    return await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    });
  }

  async checkExistedUser(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw Errors.userNotExists;
    }
    return user;
  }

  async getUserByEmail(email: string) {
    return await User.findOne({
      email: email,
      $or: [{ status: UserStatus.Active }, { status: UserStatus.Banned }],
    });
  }

  async getUSerActive(email: string) {
    const user = await User.findOne({
      email: email,
      status: UserStatus.Active,
    }).populate("majors", "name");
    return user;
  }

  async getUserPending(email: string) {
    return await User.findOne({
      email: email,
      status: UserStatus.Pending,
    });
  }

  async checkExistedEmail(email: string) {
    const user = await this.getUSerActive(email);
    if (!user) throw Errors.userNotExists;
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

  async postFcmToken(params: any) {
    const { userId, deviceId, fcmToken, platform } = params;
    const user = await this.checkExistedUser(userId);
    const device = user.devices.find((item) => item.device_id == deviceId);
    if (device) {
      device.fcm_token = fcmToken;
      device.platform = platform;
    } else {
      user.devices.push({ device_id: deviceId, fcm_token: fcmToken, platform });
    }
    await user.save();
    return user;
  }

  async getUserByFilter(filter: any) {
    if(filter.type == 'USER'){
      const users = await User.find({
        _id: {$in: filter.userId},
      }).populate('majors', 'notifications.notification');
      return users;
    }
    if(filter.type == 'MAJORS'){
      const majors = await Majors.find({
        _id: {$in: filter.majorsId},
      });
      const users = await User.find({
        majors: {$in: majors},
      }).populate('majors', 'notifications.notification');
      return users;
    }

    if(filter.type == 'ALL'){
      const users = await User.find().populate('majors', 'notifications.notification');
      return users;
    }
  }

  async getMe(userId: string) {
    const user = await User.findOne({
      _id: new mongoose.Types.ObjectId(userId),
    }).populate("majors", "name");
    const userTransformed = UserResponseDTO.transformUser(user);
    return userTransformed;
  }
}
