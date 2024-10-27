import { Inject, Service } from "typedi";
import { AuthService } from "./auth.service";
import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "../../helper/response";

@Service()
export class AuthController {
  constructor(@Inject() private authService: AuthService) {}

  sendVerificationCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const result = await this.authService.sendVerificationCode(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.verifyEmail(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.login(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.logout(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };

  refreshToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.refreshToken(req.body);
      res.send(new ResponseCustom(result));
    } catch (error) {
      next(error);
    }
  };
}
