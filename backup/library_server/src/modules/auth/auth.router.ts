import { Router } from "express";
import Container from "typedi";
import { AuthController } from "./auth.controller";
import { UserMiddleware } from "../user/user.middleware";
import { AuthMiddleware } from "./auth.middleware";
import {
  UserLoginDTO,
  UserRegisterDTO,
  UserVerifyEmailDTO,
} from "../user/dto/user.dto";
import { AuthVerifyEmailDTO } from "./dto/auth.dto";
import { Role } from "../user/types/user.type";

const authRouter = Router();
const authController = Container.get(AuthController);
const userMiddleware = new UserMiddleware();
const authMiddleware = Container.get(AuthMiddleware);

authRouter.post(
  "/auth/send-code",
  userMiddleware.validateUser(UserVerifyEmailDTO),
  authController.sendVerificationCode
);

authRouter.post(
  "/auth/verify-code",
  userMiddleware.validateUser(AuthVerifyEmailDTO),
  authController.verifyEmail
);

authRouter.post(
  "/auth/register",
  userMiddleware.validateUser(UserRegisterDTO),
  authController.register
);

authRouter.post(
  "/auth/login",
  userMiddleware.validateUser(UserLoginDTO),
  authController.login
);

authRouter.post("/auth/logout", authController.logout);

authRouter.post(
  "/auth/refresh-token",
  authMiddleware.authenticateRefreshToken([Role.Admin, Role.User]),
  authController.refreshToken
);

export default authRouter;
