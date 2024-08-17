const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateJWT = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    // gọi hàm next để chuyển tiếp req đến các middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission" });
    }
    next();
  };
};

module.exports = {authenticateJWT, authorizeRoles}