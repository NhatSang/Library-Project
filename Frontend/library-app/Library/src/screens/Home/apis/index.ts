import { api } from '../../../apis/configAPI';

const _getNewestBooks = async () => {
    const url = `/get-newest-books`;
    return api.get(url);
};

const _getChapterByIdBook = async (id: string) => {
    const url = '/get-chapter-by-book-id';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _getReviewNewest = async (id: string) => {
    const url = '/get-review-newest-by-book-id';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _getAllReviewByBookId = async (id: string) => {
    const url = '/get-review-by-book-id';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _createReview = async (data: any) => {
    const url = '/create-review';
    return api.post(url, data);
};

const _createNote = async (data: any) => {
    const url = '/create-note';
    return api.post(url, data);
};

const _getNoteByBookId = async (id: string) => {
    const url = '/get-note-by-book-id';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _deleteNote = async (id: string) => {
    const url = '/delete-note';
    return api.delete(url, {
        params: {
            noteId: id,
        },
    });
};

const _createHistory = async (data: any) => {
    const url = '/create-history';
    return api.post(url, data);
};

const _getHistoryByBookIdAndUser = async (bookId: string) => {
    const url = '/get-history-by-book-id-and-user';
    return api.get(url, {
        params: {
            bookId,
        },
    });
};

export {
    _createHistory,
    _createNote,
    _createReview,
    _deleteNote,
    _getAllReviewByBookId,
    _getChapterByIdBook,
    _getHistoryByBookIdAndUser,
    _getNewestBooks,
    _getNoteByBookId,
    _getReviewNewest,
};
