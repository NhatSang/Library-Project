// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secretKey = process.env.SECRET_KEY_JWT;

export const generateToken = (email,id, role) => {
  const payload = { email: email,userId:id, role: role };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secretKey, options);
  return token;
};
