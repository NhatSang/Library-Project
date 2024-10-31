import { Inject, Service } from "typedi";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";
import { Pagination } from "../../helper/pagination";

@Service()
export class UserController {
  constructor(@Inject() private userService: UserService) {}

  _banUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.banUser(req.body.userId);
      res.send(new ResponseCustom(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  _findUserByKeyword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { users, pagination } = await this.userService.findUserByKeyword(
        req.body.keyword,
        Pagination.fromRequest(req)
      );
      res.send(new ResponseCustom(users, null, pagination));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  _postFcmtoken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.postFcmToken(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
