// const { generateToken } = require("../jwt/JwtService");
// const Majors = require("../models/Majors");
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");

import { generateToken } from "../jwt/JwtService.js";
import Majors from "../models/Majors.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const {
      name,
      gender,
      dob,
      email,
      password,
      conformPassword,
      majors,
      role,
      code,
    } = req.body;
    if (password !== conformPassword)
      return res.send({ message: "Conform password is invalid!" });
    const user = await User.findOne({ username: username });
    if (user) return res.send({ message: "User already exits" });
    //hashpassword
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: name,
      gender: gender,
      dob: dob,
      email: email,
      password: hashpassword,
      majors: majors,
      role: role,
      code: code,
    });
    await newUser.save();
    return res.status(201).json({ data: newUser });
  } catch (err) {
    console.log("Error signup: ", err.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email, active: true });
    if (user) {
      const result = await bcrypt.compare(password, user.password);
      if (result) {
        const token = generateToken(user.email, user._id, user.role);
        return res.status(200).json({
          status: true,
          data: {
            user: user,
            accessToken: token,
          },
          message: "Login successfully",
        });
      }
      return res.send("Incorrect password");
    }
    return res.json({
      status: false,
      message: "User not found",
    });
  } catch (err) {
    console.log("Error login: ", err.message);
  }
};

export const loginWithMicrosoft = async (req, res) => {
  const userInfo = req.body;
  try {
    const user = await User.findOne({ email: userInfo.email });
    if (user) {
      const result = await bcrypt.compare(userInfo.password, user.password);
      if (result) {
        const token = generateToken(user.email, user._id, user.role);
        return res.status(200).json({
          status: true,
          data: {
            user: user,
            accessToken: token,
          },
          message: "Login successfully",
        });
      }
      return res.status(401).josn({
        status: false,
        message: "Incorrect password",
      });
    } else {
      const major = await Majors.findOne({ name: userInfo.majors.name });
      const salt = await bcrypt.genSalt(10);
      const hashpassword = await bcrypt.hash(userInfo.password, salt);
      const newUser = new User({
        name: userInfo.name,
        gender: userInfo.gender,
        dob: userInfo.dob,
        email: userInfo.email,
        password: hashpassword,
        majors: major._id,
        code: userInfo.code,
      });
      await newUser.save();
      const token = generateToken(newUser.email, newUser._id, newUser.role);
      return res.status(201).json({
        status: true,
        data: {
          user: newUser,
          accessToken: token,
        },
        message: "Create new user successfully",
      });
    }
  } catch (error) {
    console.log("Error loginWithMicrosoft: ", error);
  }
};


export const loginWithAccount = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const result = password === user.password;
      if (result) {
        const token = generateToken(user.email, user._id, user.role);
        return res.status(200).json({
          status: true,
          data: {
            user: user,
            accessToken: token,
          },
          message: "Login successfully",
        });
      }
      return res.status(401).json({
        status: false,
        message: "Incorrect password",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
  }
  catch (error) {
    console.log("Error loginWithAccount: ", error);
  }
}