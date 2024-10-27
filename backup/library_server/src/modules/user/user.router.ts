import { Router } from "express";
import { UserMiddleware } from "./user.middleware";
import Container from "typedi";
import { UserController } from "./user.controller";
import { UserRegisterDTO } from "./dto/user.dto";

const userRouter = Router();
const userMiddleware = new UserMiddleware();
const userController = Container.get(UserController);


userRouter.post("/ban-user", userController.banUser);

userRouter.post("/find-user", userController.findUserByKeyword);

export default userRouter;
