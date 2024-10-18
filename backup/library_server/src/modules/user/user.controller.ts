import { Inject, Service } from "typedi";
import { UserService } from "./user.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class UserController {
  constructor(@Inject() private userService: UserService) {}
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.register(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
