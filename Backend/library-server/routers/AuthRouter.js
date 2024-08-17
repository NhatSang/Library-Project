const express = require("express");
const { sendCode, verifyCode } = require("../services/MailService");
const { signup, login } = require("../controllers/AuthController");
const authRouter = express.Router();

// authRouter.post("/send-code", sendCode);
// authRouter.post("/verify-code", verifyCode);
authRouter.post("/signup", signup);
authRouter.post("/login", login);

// Protected route for both admin and user
authRouter.get("/profile", authenticateJWT, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});
// Route chỉ cho phép admin truy cập
authRouter.get(
  "/admin",
  authenticateJWT,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Admin content" });
  }
);

// Route chỉ cho phép user truy cập
authRouter.get("/user", authenticateJWT, authorizeRoles("user"), (req, res) => {
  res.json({ message: "User content" });
});

module.exports = authRouter;
