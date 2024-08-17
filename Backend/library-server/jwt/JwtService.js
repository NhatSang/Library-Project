const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const secretKey = process.env.SECRET_KEY_JWT;

const generateToken = (username, role) => {
  const payload = { username: username, role: role };
  const options = { expiresIn: "7d" };
  const token = jwt.sign(payload, secretKey, options);
  console.log("TOKEN: ", token);
  return token;
};

module.exports = { generateToken };
