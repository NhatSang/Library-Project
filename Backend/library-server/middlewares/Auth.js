import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader.split(' ')[1];
  if (!authHeader) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT);
    req.user = decoded;
    // gọi hàm next để chuyển tiếp req đến các middleware hoặc route handler tiếp theo
    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "You do not have permission" });
    }
    next();
  };
};
