import { api } from '../../../apis/configAPI';

const _getProfile = async () => {
    const url = '/me';
    return api.get(url);
};

export { _getProfile };
