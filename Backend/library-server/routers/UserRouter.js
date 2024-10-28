import express from 'express';
import { getUserById, updateFCMToken } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/get-user-by-id', getUserById);
userRouter.post('/post-fcm-token', updateFCMToken);

export default userRouter;