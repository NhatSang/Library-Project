import { api, api2, api3 } from '../../../apis/configAPI';

const _getNewestBooks = async () => {
    const url = `/get-newest-books`;
    return api.get(url);
};

const _getChapterByIdBook = async (id: string) => {
    const url = '/get-chapter-by-book-id';
    return api2.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _getReviewNewest = async (id: string) => {
    const url = '/review-newest';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _getAllReviewByBookId = async (id: string) => {
    const url = '/review';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _createReview = async (data: any) => {
    const url = '/review';
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

const _getHistoryByBookIdAndUser = async (bookId: string) => {
    const url = '/get-history-by-book-id-and-user';
    return api2.get(url, {
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

const _getAllBook2 = async () => {
    const url = '/get-all-book2';
    return api2.get(url);
};

const _getBookContentBypage = async (id: string, page: number) => {
    const url = '/get-book-content-by-page';
    return api2.get(url, {
        params: {
            bookId: id,
            page,
        },
    });
};

const _getSummaryByBookId = async (id: string) => {
    const url = '/get-summary-by-book-id';
    return api.get(url, {
        params: {
            bookId: id,
        },
    });
};

const _searchBook = async (stringName: any) => {
    const url = '/search-book';
    return api2.get(url, {
        params: {
            searchString: stringName,
        },
    });
};

const _getNotificationByUser = async () => {
    const url = '/user/notifications';
    return api.get(url);
};

const _getNotificationById = async (id: string) => {
    console.log('id', id);
    const url = '/notification';
    return api.get(url, {
        params: {
            id,
        },
    });
};
//
const _getBooksByMajorsUser = () => {
    const url = '/book/get-by-majors-user';
    return api.get(url);
};

const _getBookNewest = async () => {
    const url = '/book/get-newest';
    return api.get(url);
};

const _getBookTopView = async () => {
    const url = '/book/get-top-viewed';
    return api.get(url);
};

const _markAsRead = async (id: string) => {
    const url = '/notification/mark-as-read';
    return api.post(url, {
        id,
    });
};

const _getBooksAI = async (id: string) => {
    const url = `/recommend/recommend_books_rating/${id}`;
    return api3.get(url);
};

const _findBook = async (keyword: string) => {
    const url ="/books/find_books";
    return api.get(url, {
        params: {
            keyword,
        },
    });
}

const _getBookDetail = async (bookId: string) => {
    const url =  "/books/book-details";
    return api.get(url, {
        params: {
            bookId,
        },
    });
}

export {
    _createNote,
    _createReview,
    _deleteNote,
    _getAllBook2,
    _getAllReviewByBookId,
    _getBookContentBypage,
    _getBookNewest,
    _getBooksAI,
    _getBooksByMajorsUser,
    _getBooksByMayjors,
    _getBookTopView,
    _getChapterByIdBook,
    _getHistoryByBookIdAndUser,
    _getNewestBooks,
    _getNoteByBookId,
    _getNotificationById,
    _getNotificationByUser,
    _getRecomendBoook,
    _getRecomendBoookByMajor,
    _getReviewNewest,
    _getSummaryByBookId,
    _markAsRead,
    _searchBook,
    _updateModel,
    _findBook,
    _getBookDetail
};
