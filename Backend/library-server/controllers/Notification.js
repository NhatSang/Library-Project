import User from "../models/User.js";
import Notification from "../models/Notification.js";
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';
import Book2 from "../models/Book2.js";

const serviceAccountPath = path.resolve('/Users/phamducnhan/Documents/doantotnghiep/Library-Project/Backend/library-server/json-key/serviceAccount.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

export const createNotification = async (req, res) => {
    try {
        const { title, content,status,filterCondition,data } = req.body;
        const filterConditionObject = JSON.parse(filterCondition);
        const dataObject = JSON.parse(data);
        const notification = new Notification({
            title,
            content,
            status,
            filterCondition: filterConditionObject,
            data: dataObject,
        });
        await notification.save();
        res.status(200).json({ message: 'Notification created' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const changeNotificationStatus = async (req, res) => {
    try {
        const { id_notification} = req.body;
        const notification = await Notification.findOne({ _id: id_notification });
        notification.status = "sending";
        await notification.save();
        console.log(notification);
        res.status(200).json({ message: 'Notification status changed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const sendNotification = async (
    id_notification,
    userId
) => {
    try {
        const notification = await Notification.findOne({ _id: id_notification });
        const user = await User.findOne({ _id: userId });
        const devices = user.devices; 
        const tokens = devices.map(device => device.fcm_token);
        console.log('Send notification to:', tokens);
        const message = {
            notification: {
                title: notification.title,
                body: notification.content,
                image: notification.image,
            },
            data: {
                notification_id: notification._id.toString(),
                books: JSON.stringify(notification.data),
            },
            token: tokens[0],
        }
        admin.messaging().send(message)
            .then((response) => {
                user.notifications.push({notification: notification._id});
                user.save();
            })
            .catch((error) => {
                console.log('Error sending message:', error);
            });
        console.log('Send notification success');
    } catch (error) {
       console.log(error);
    }
}

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find();
        res.status(200).json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const { id_notification} = req.body;
        await Notification.deleteOne({
            _id: id_notification,
        });
        res.status(200).json({ message: 'Notification deleted' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getNotificationByUser = async (req, res) => {
    try {
        const _user = req.user;
        console.log(_user);
        const user = await User.findOne({ _id: _user.userId }).populate('notifications.notification');
        const notifications = user.notifications;
        res.status(200).json(
            {
                message: 'Get notification by user success',
                data: notifications,
            }
        );
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getNotificationById = async (req, res) => {
    try {
        const { id_notification } = req.query;
        const notification = await Notification.findOne({ _id: id_notification });
        const bookid = notification.data;
        const books = await Book2.find({ _id: { $in: bookid } });
        return res.status(200).json({ message: "Success", data: books });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


