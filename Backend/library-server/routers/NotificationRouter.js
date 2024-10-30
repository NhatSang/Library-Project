import {changeNotificationStatus, createNotification,deleteNotification,getNotificationById,getNotificationByUser,getNotifications,sendNotification} from '../controllers/Notification.js'
import express from 'express';
import { authenticateJWT } from '../middlewares/Auth.js';

const notificationRouter = express.Router();

notificationRouter.post('/send-notification', sendNotification);
notificationRouter.post('/create-notification', createNotification);
notificationRouter.get('/notifications', getNotifications);
notificationRouter.post('/update-sending', changeNotificationStatus);
notificationRouter.post('/delete-notification', deleteNotification);
notificationRouter.get('/get-notification-by-user',authenticateJWT, getNotificationByUser);
notificationRouter.get('/get-notification-by-id', getNotificationById);


export default notificationRouter;


