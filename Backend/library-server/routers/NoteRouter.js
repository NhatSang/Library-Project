import express from 'express';
import {
    getNoteByBookId,
    createNote,
    deleteNote
} from '../controllers/NoteController.js';

const noteRouter = express.Router();

noteRouter.get('/get-note-by-book-id', getNoteByBookId);
noteRouter.post('/create-note', createNote);
noteRouter.delete('/delete-note', deleteNote);

export default noteRouter;
