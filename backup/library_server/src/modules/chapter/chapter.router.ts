import { Router } from "express";
import Container from "typedi";
import { AuthMiddleware } from "../auth/auth.middleware";
import { ChapterController } from "./chapter.controller";
import { Role } from "../user/types/user.type";

const chapterRouter = Router();
const authMiddleware = Container.get(AuthMiddleware);
const chapterController = Container.get(ChapterController);

//query : bookId
chapterRouter.get(
  "/book/chapters",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  chapterController._getChapters
);
//query : chapterId
chapterRouter.get(
  "/book/chapter",
  authMiddleware.authenticateAccessToken([Role.Admin, Role.User]),
  chapterController._getChapterById
);

chapterRouter.post(
  "/book/chapter",
  authMiddleware.authenticateAccessToken([Role.Admin]),
  chapterController._addChapter
);

export default chapterRouter;
