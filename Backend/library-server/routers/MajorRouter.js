import express from 'express';

import { createMajor,getAllMajors } from '../controllers/MajorController.js';

const majorRouter = express.Router();

majorRouter.post('/create-major', createMajor);
majorRouter.get('/get-all-majors', getAllMajors);

export default majorRouter;