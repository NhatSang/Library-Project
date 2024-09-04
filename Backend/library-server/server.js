// const express = require("express");
// const http = require("http");
// const ConnectDB = require("./database/ConnectDB");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const authRouter = require("./routers/AuthRouter");
// const bookRouter = require("./routers/BookRouter");

import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";

import ConnectDB from "./database/ConnectDB.js";
import authRouter from "./routers/AuthRouter.js";
import bookRouter from "./routers/BookRouter.js";

dotenv.config();
const app = express();
const port = 5001;

const corsOprions = {
  origin: "*",
  // một số trình duyệt cũ (IE11, một số SmartTV) có thể gặp sự cố với 204
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOprions));

const server = http.createServer(app);

app.use("/api/v1", authRouter);
app.use("/api/v1", bookRouter);

server.listen(port, () => {
  ConnectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
