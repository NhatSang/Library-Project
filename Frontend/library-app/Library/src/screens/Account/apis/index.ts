import { api } from '../../../apis/configAPI';

const _getProfile = async () => {
    const url = '/get-user-by-id';
    return api.get(url);
};

export { _getProfile };
