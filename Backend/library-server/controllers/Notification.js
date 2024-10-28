import User from "../models/User.js";
import Notification from "../models/Notification.js";
import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import path from 'path';

const serviceAccountPath = path.resolve('/Users/phamducnhan/Documents/doantotnghiep/Library-Project/Backend/library-server/json-key/serviceAccount.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

export const createNotification = async (req, res) => {
    try {
        const { title, content,status,filterCondition } = req.body;
        const notification = new Notification({
            title,
            content,
            status,
            filterCondition
        });
        await notification.save();
        res.status(200).json({ message: 'Notification created' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}


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
                image: notification.image
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

