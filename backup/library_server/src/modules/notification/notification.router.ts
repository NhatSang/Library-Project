import { Router } from "express";
import Container from "typedi";
import { NotificationController } from "./notification.controller";

const notificationRouter = Router();
const notificationController = Container.get(NotificationController);


notificationRouter.post("/notification", notificationController._createNotification);
notificationRouter.get("/notifications", notificationController._getNotifications);
//query: id
notificationRouter.get("/notification", notificationController._getNotificationById);
//query: id
notificationRouter.delete("/notification", notificationController._deleteNotification);
//query: id
notificationRouter.put("/notification", notificationController._updateSendingStatus);
//query: userId
notificationRouter.get("/user/notifications", notificationController._getNotificationByUser);

export default notificationRouter;

