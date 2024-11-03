import {api, api2} from '../../../apis/config';


const _getGenres = async () => {
    return await api.get('/genres');
};

const _getMajors = async () => {
    return await api.get('/majors');
}

const _createBook = async (data) => {
    const resonpse = await api2.post('/add-book', data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        }
        });
        return resonpse.data
}

const _createChapter = async (data) => {
    return await api2.post('/add-chapter', data);
}

const _createSummary = async (data) => {
    return await api2.post('/add-summary', data);
}

const _getChapters = async (bookId) => {
    const url = "/get-chapters";
    return await api2.get(url, {
        params: {
            bookId
        }
    });
}

const _getBook = async () => {
    const url = "/book/get-newest";
    return await api.get(url);
}

const _getBookById = async (id) => {
    const url = "/book"
    return await api.get(url, {
        params: {
            id
        }
    });
}



export {
    _getGenres,
    _getMajors,
    _createBook,
    _createChapter,
    _createSummary,
    _getChapters,
    _getBook,
    _getBookById
}