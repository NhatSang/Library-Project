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
    const url = "/get-all-book2";
    return await api2.get(url);
}



export {
    _getGenres,
    _getMajors,
    _createBook,
    _createChapter,
    _createSummary,
    _getChapters,
    _getBook
}