import { NextFunction, Request, Response } from "express";
import { ResponseCustom } from "./response";

export class ErrorCustom extends Error {
  status: number;
  code: string;
  message: string;
  constructor(message: string, code: string, status: number = 400) {
    super();
    this.status = status;
    this.code = code;
    this.message = message;
  }
}
export const Errors = {
  badRequest: new ErrorCustom("Bad request", "badRequest", 400),
  internalServer: new ErrorCustom(
    "Internal Server Error",
    "internalServer",
    500
  ),
  unAuthorized: new ErrorCustom("Unauthorized", "unAuthorized", 401),
  forbidden: new ErrorCustom("Forbidden", "forbidden", 403),
  conflict: new ErrorCustom("Conflict", "conflict", 409),
  userExists: new ErrorCustom("User already exists", "userExists", 409),
  userNotExists: new ErrorCustom("User does not exist", "userNotExists", 400),
  tooManyRequest: new ErrorCustom(
    "You have exceeded the number of confirmation code submissions for the day",
    "tooManyRequest",
    429
  ),
  wrongPassword: new ErrorCustom("Wrong password", "wrongPassword", 401),
  isNotEmpty: new ErrorCustom("Values should not be empty", "isNotEmpty", 400),
  invalidRepassword: new ErrorCustom(
    "Invalid Repassword",
    "invalidRepassword",
    400
  ),
  invalidCode: new ErrorCustom("Invalid Code", "invalidCode", 400),
  expiredCode: new ErrorCustom("Expired Code", "expiredCode", 410),
};
export const handleErrors = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(error.stack);
  if (error instanceof ErrorCustom) {
    res
      .status(error.status || Errors.badRequest.status)
      .send(new ResponseCustom(null, error));
  }
  res
    .status(Errors.internalServer.status)
    .send(new ResponseCustom(null, Errors.internalServer));
};

export const handleErrorsMiddleware = (errors: any, res: Response) => {
  if (errors.length > 0) {
    const error = new ErrorCustom(
      errors[0].constraints,
      Errors.badRequest.code,
      Errors.badRequest.status
    );
    res.status(Errors.badRequest.status).send(new ResponseCustom(null, error));
  }
};
