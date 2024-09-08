import express from 'express';
import { getUserById } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/get-user-by-id', getUserById);

export default userRouter;