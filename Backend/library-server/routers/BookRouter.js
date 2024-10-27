// const express = require("express");
// const { upload } = require("../services/AwsServices");
// const { addBook } = require("../controllers/BookController");

import express from "express";
import { upload } from "../services/AwsServices.js";
import {
  addBook,
  addChapter,
  deleteBook,
  deleteChapter,
  getChapters,
  getNewestBooks,
  getBookById,
  getBooksByMajors,
  getSummaryByBookId,
  searchBooksByName,
} from "../controllers/book_controller/BookController.js";
import { authenticateJWT } from "../middlewares/Auth.js";
import { getAllBooks2, getrBookContentByPage } from "../controllers/book_controller/Book2Controller.js";

const bookRouter = express.Router();

bookRouter.post(
  "/add-book",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  addBook
);
bookRouter.get("/get-all-book2",getAllBooks2);
bookRouter.get("/get-book-content-by-page", getrBookContentByPage);
bookRouter.post("/add-chapter", upload.none(), addChapter);
bookRouter.get("/get-chapters/:id", getChapters);
bookRouter.delete("/delete-chapter/:id", deleteChapter);
bookRouter.delete("/delete-book/:id", deleteBook);
bookRouter.get("/get-newest-books", getNewestBooks);
bookRouter.get("/get-book-by-id", getBookById);
bookRouter.get("/get-book-by-majors",authenticateJWT, getBooksByMajors);
bookRouter.get("/get-summary-by-book-id", getSummaryByBookId);
bookRouter.get("/search-book", searchBooksByName);
export default bookRouter;
