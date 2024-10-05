import express from 'express';

import {addGenre,getGenres} from '../controllers/GenreController.js';

const genreRouter = express.Router();

genreRouter.get('/get-genre', getGenres);
genreRouter.post('/add-genre', addGenre);

export default genreRouter;