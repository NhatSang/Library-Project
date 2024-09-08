import Note from '../models/Note.js';

export const getNoteByBookId = async (req, res) => {
    try {
        const _user = req.user;
        const bookId = req.query.bookId;
        const notes = await Note.find({ user: _user.userId, book: bookId });
        return res.status(200).json({
            status: true,
            message: 'Success',
            data: notes,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

export const createNote = async (req, res) => {
    try {
        const _user = req.user;
        const { page,content, book } = req.body;
        const note = await Note.create({
            page,
            content,
            user: _user.userId,
            book,
        });
        return res.status(201).json({
            status: true,
            message: 'Create Success',
            data: note,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

export const deleteNote = async (req, res) => {
    try {
        const _user = req.user;
        const noteId = req.query.noteId;
        const note = await Note.findOne({ user: _user.userId, _id: noteId });
        if (!note) {
            return res.status(404).json({
                status: false,
                message: 'Note not found',
            });
        }
        await note.deleteOne();
        return res.status(200).json({
            status: true,
            message: 'Delete Success',
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}

export const updateNote = async (req, res) => {
    try {
        const _user = req.user;
        const noteId = req.params.noteId;
        const { content } = req.body;
        const note = await Note.findOne({ user: _user.userId, _id: noteId });
        if (!note) {
            return res.status(404).json({
                status: false,
                message: 'Note not found',
            });
        }
        note.title = title;
        note.content = content;
        note.updatedAt = new Date();
        await note.save();
        return res.status(200).json({
            status: true,
            message: 'Update Success',
            data: note,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            status: false,
            message: err.message
        });
    }
}