import {api} from '../../../apis/config';

export const _banUser = async (userId) => {
    const url = '/ban-user';
    return await api.post(url, {userId});
}

export const _getUsers = async (page, limit, keyword) => {
    const url = `/find-user?page=${page}&limit=${limit}`;
    return await api.post(url, {keyword});
}