import { Router } from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { BookController } from "./book.controller";
import { Role } from "../user/types/user.type";

const bookRouter = Router();
const authMiddleware = Container.get(AuthMiddleware);
const bookController = Container.get(BookController);

bookRouter.get(
  "/book/get-content",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  bookController.getrBookContentByPage
);

bookRouter.get(
  "/book/get-by-majors-user",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  bookController.getBookByMajorsUserId
);

bookRouter.get(
  "/book/get-newest",
  bookController.getBookNewest
);

bookRouter.get(
  "/book/get-top-rated",
  bookController.getTopRatedBooks
);

bookRouter.get(
  "/book/get-top-viewed",
  bookController.getTopViewedBooks
);
export default bookRouter;
