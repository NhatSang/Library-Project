import mongoose, { mongo } from 'mongoose';

const historySchema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    page: { type: Number, default: 1 },
    chapter:{type:mongoose.Schema.Types.ObjectId, ref: 'Chapter'},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const History = mongoose.model('History', historySchema);
export default History;