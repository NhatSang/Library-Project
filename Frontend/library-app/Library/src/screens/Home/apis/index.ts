import { api, api2 } from '../../../apis/configAPI';

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

const _getBooksByMayjors = async (id: string) => {
    const url = '/get-book-by-majors';
    return api.get(url, {
        params: {
            majorsId: id,
        },
    });
};

const _getRecomendBoook = async (id: string) => {
    const url = `/recommend_books/${id}`;
    return api2.get(url);
};

const _getRecomendBoookByMajor = async (id: string) => {
    const url = `/recommend_books_by_majors/${id}`;
    return api2.get(url);
};
const _updateModel = async (id: string) => {
    const url = `/update_model`;
    return api2.post(url, {
        userId: id,
    });
};

export {
    _createHistory,
    _createNote,
    _createReview,
    _deleteNote,
    _getAllReviewByBookId,
    _getBooksByMayjors,
    _getChapterByIdBook,
    _getHistoryByBookIdAndUser,
    _getNewestBooks,
    _getNoteByBookId,
    _getRecomendBoook,
    _getRecomendBoookByMajor,
    _getReviewNewest,
    _updateModel,
};
