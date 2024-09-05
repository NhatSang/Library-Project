import { api } from '../../../apis/configAPI';

const _getNewestBooks = async () => {
    const url = `/get-newest-books`;
    return api.get(url);
};

const _getChapterByIdBook = async (id: string) => {
    const url = `/get-chapter-by-book-id/${id}`;
    return api.get(url);
}

export { _getNewestBooks,_getChapterByIdBook };