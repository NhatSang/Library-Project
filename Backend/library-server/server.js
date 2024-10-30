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
import chapterRouter from "./routers/ChapterRouter.js";
import reviewRouter from "./routers/ReviewRouter.js";
import noteRouter from "./routers/NoteRouter.js";
import { authenticateJWT } from "./middlewares/Auth.js";
import majorRouter from "./routers/MajorRouter.js";
import userRouter from "./routers/UserRouter.js";
import historyRouter from "./routers/HistoryRouter.js";
import notificationRouter from "./routers/NotificationRouter.js";

import cron from 'node-cron';
import Notification from "./models/Notification.js";
import { getUserByFilter } from "./controllers/UserController.js";
import { sendNotification } from "./controllers/Notification.js";


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
app.use("/api/v1", chapterRouter);
app.use("/api/v1", majorRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1",authenticateJWT ,reviewRouter);
app.use("/api/v1", authenticateJWT,noteRouter);
app.use("/api/v1", authenticateJWT, userRouter);
app.use("/api/v1", authenticateJWT, historyRouter);

cron.schedule('*/1 * * * * ', async () => {
  try {
    console.log('Cron job running');
      const notifications = await Notification.find({status: 'sending'});
      for (const notification of notifications) {
          const users = await getUserByFilter(notification.filterCondition);
          console.log('Users:', users);
          for(const user of users){
            console.log('Send notification to user:', user.name);
              await sendNotification(notification._id, user._id);
          }
          notification.status = 'sended';
          await notification.save();
      }
  } catch (error) {
      console.log(error);
      
  }
});

server.listen(port, () => {
  ConnectDB();
  console.log(`Server is running at http://localhost:${port}`);
});
