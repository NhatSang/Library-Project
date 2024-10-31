import { Router } from "express";
import { UserMiddleware } from "./user.middleware";
import Container from "typedi";
import { UserController } from "./user.controller";
import { UserRegisterDTO } from "./dto/user.dto";

const userRouter = Router();
const userMiddleware = new UserMiddleware();
const userController = Container.get(UserController);


userRouter.post("/ban-user", userController._banUser);

userRouter.post("/find-user", userController._findUserByKeyword);

userRouter.post("/user/fcm-token", userController._postFcmtoken);

export default userRouter;
