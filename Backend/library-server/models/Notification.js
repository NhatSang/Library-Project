import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    filterCondition: { type: Object},
    image: { type: String },
    status: { type: String, enum: ['pending', 'sending', 'sended'], default: 'pending' },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;