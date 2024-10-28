import {createNotification,sendNotification} from '../controllers/Notification.js'
import express from 'express';

const notificationRouter = express.Router();

notificationRouter.post('/send-notification', sendNotification);
notificationRouter.post('/create-notification', createNotification);


export default notificationRouter;


