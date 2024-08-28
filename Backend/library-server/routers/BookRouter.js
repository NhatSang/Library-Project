// const express = require("express");
// const { upload } = require("../services/AwsServices");
// const { addBook } = require("../controllers/BookController");

import express from "express";
import { upload } from "../services/AwsServices.js";
import { addBook } from "../controllers/book_controller/BookController.js";

const bookRouter = express.Router();

bookRouter.post("/add-book", upload.single("pdf"), addBook);

export default bookRouter;
