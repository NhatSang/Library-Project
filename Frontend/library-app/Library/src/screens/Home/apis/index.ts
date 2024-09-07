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

export {
    _createReview,
    _getAllReviewByBookId,
    _getChapterByIdBook,
    _getNewestBooks,
    _getReviewNewest,
};
