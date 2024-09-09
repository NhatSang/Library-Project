import User from "../models/User.js";
import { saveFile } from "../services/AwsServices.js";

export const getUserById = async (req, res) => {
  try {
    const _user = req.user;
    const user = await User.findById(_user.userId).populate(
      "majors",
      "_id name"
    );
    return res.status(200).json({
      status: true,
      message: "Success",
      data: user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;
    const users = await User.find({ role: "user" })
      .skip(skip)
      .limit(limit)
      .populate("Majors");
    return res.status(200).json({
      status: true,
      message: "Success",
      data: users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const banUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.updateOne(
      { _id: id },
      { $set: { active: false } }
    );
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const unbanUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.updateOne(
      { _id: id },
      { $set: { active: true } }
    );
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id, name, gender, dob, majors } = req.body;
    const image = await saveFile(req.file);
    const paramUpdate = {
      $set: {
        name: name,
        gender: gender,
        dob: dob,
        majors: majors,
        image: image,
      },
    };
    const result = await User.updateOne({ _id: id }, paramUpdate);
    return res.status(200).json({ message: "Success" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};
