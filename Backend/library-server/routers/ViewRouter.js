import express from 'express';
import { addViewByBookId } from '../controllers/ViewController.js';



const viewRouter = express.Router();

viewRouter.post('/add-view-by-bookId', addViewByBookId);

export default viewRouter;