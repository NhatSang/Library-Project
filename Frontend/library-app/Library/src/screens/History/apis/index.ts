import { api } from '../../../apis/configAPI';

const _getHistoryByUser = async () => {
    const url = '/histories';
    return api.get(url);
};

export { _getHistoryByUser };
