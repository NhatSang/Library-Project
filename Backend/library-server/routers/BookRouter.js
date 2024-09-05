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
getNewestBooks,getBookById} from "../controllers/book_controller/BookController.js";

const bookRouter = express.Router();

bookRouter.post(
  "/add-book",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  addBook
);
bookRouter.post("/add-chapter", upload.none(), addChapter);
bookRouter.get("/get-chapters/:id", getChapters);
bookRouter.delete("/delete-chapter/:id", deleteChapter);
bookRouter.delete("/delete-book/:id", deleteBook);

bookRouter.get(
  "/get-newest-books",
  getNewestBooks
);
bookRouter.get(
  "/get-book-by-id",
  getBookById
);

export default bookRouter;
