import { Router } from "express";
import { UserMiddleware } from "./user.middleware";
import Container from "typedi";
import { UserController } from "./user.controller";
import { UserRegisterDTO } from "./dto/user.dto";
import { AuthMiddleware } from "../auth/auth.middleware";
import { Role } from "./types/user.type";

const userRouter = Router();
const userMiddleware = new UserMiddleware();
const userController = Container.get(UserController);
const authMiddleware = Container.get(AuthMiddleware);

userRouter.get(
  "/me",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  userController._getMe
);

userRouter.post("/ban-user", userController._banUser);

userRouter.post("/find-user", userController._findUserByKeyword);

userRouter.post("/user/fcm-token", userController._postFcmtoken);

export default userRouter;
