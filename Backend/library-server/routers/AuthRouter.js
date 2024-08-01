const express = require("express");
const { sendCode, verifyCode } = require("../services/MailService");
const { signup, login } = require("../controllers/AuthController");
const authRouter = express.Router();

authRouter.post("/send-code", sendCode);
authRouter.post("/verify-code", verifyCode);
authRouter.post("/signup", signup);
authRouter.post("/login", login);

module.exports = authRouter;
