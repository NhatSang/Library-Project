import { Router } from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ChapterController } from "./chapter.controller";
import { Role } from "../user/types/user.type";

const chapterRouter = Router();
const authMiddleware = Container.get(AuthMiddleware);
const chapterController = Container.get(ChapterController);

chapterRouter.get(
  "/book/chapters/:bookId",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  chapterController.getChapters
);
chapterRouter.get(
  "/book/chapter/:chapterId",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  chapterController.getChapterById
);
export default chapterRouter;
