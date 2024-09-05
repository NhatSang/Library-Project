import express from "express";
import { getChapterByBookId } from "../controllers/ChapterController.js";

const chapterRouter = express.Router();

chapterRouter.get("/get-chapter-by-book-id/:bookId", getChapterByBookId);

export default chapterRouter;