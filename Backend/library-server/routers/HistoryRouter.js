import express from 'express';

import {  createHistoryAndView,getHistoryByUserId,getHistoryByBookIdAndUser} from '../controllers/HistoryController.js';

const historyRouter = express.Router();

historyRouter.post('/create-history-view', createHistoryAndView);
historyRouter.get('/get-history-by-user-id', getHistoryByUserId);
historyRouter.get('/get-history-by-book-id-and-user', getHistoryByBookIdAndUser);

export default historyRouter;