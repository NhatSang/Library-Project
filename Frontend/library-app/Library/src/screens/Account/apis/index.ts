import { api } from '../../../apis/configAPI';

const _getProfile = async () => {
    const url = '/me';
    return api.get(url);
};

const _updateImage = async (data: any) => {
    const url = '/users/update-avatar';
    return api.post(url, data,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export type iUpdateUser = {
    name: string;
}

const _updateUser = async (data: any) => {
    const url = '/users/update';
    return api.post(url, data);
}

export { _getProfile,_updateImage };
