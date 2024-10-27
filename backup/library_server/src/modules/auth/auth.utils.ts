import jwt from "jsonwebtoken";
import { env } from "../../helper";


export const generateAccessToken = (payload: any) => {
  return jwt.sign(payload, env.ACCESS_TOKEN_SECRET, { expiresIn: 120 });
};

export const generateRefreshToken = (payload: any, experation: number) => {
  return jwt.sign(payload, env.REFRESH_TOKEN_SECRET, { expiresIn: experation });
};

export const verifyAccessToken = (token: string) => {
  try {
    return jwt.verify(token, env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};

export const verifyRefreshToken = (token: string) => {
  try {
    return jwt.verify(token, env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    return null;
  }
};
