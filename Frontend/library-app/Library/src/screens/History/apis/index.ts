import { api } from '../../../apis/configAPI';

const _getHistoryByUser = async () => {
    const url = '/histories';
    return api.get(url);
};

export type iCreateHistory = {
    book: string,
    chapter: string,
    page: number,
};

const _createHistory = async (data: iCreateHistory) => {
    const url = '/history';
    return api.post(url, data);
};

const _deleteHistory = async (bookId: string) => {
    const url = `/historys/${bookId}`;
    return api.delete(url);
};

export { _createHistory, _deleteHistory, _getHistoryByUser };
