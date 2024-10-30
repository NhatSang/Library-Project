import {changeNotificationStatus, createNotification,deleteNotification,getNotifications,sendNotification} from '../controllers/Notification.js'
import express from 'express';

const notificationRouter = express.Router();

notificationRouter.post('/send-notification', sendNotification);
notificationRouter.post('/create-notification', createNotification);
notificationRouter.get('/notifications', getNotifications);
notificationRouter.post('/update-sending', changeNotificationStatus);
notificationRouter.post('/delete-notification', deleteNotification);


export default notificationRouter;


