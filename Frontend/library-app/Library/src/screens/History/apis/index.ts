import { api } from '../../../apis/configAPI';

const _getHistoryByUser = async () => {
    const url = `/get-history-by-user-id`;
    return api.get(url);
};

export { _getHistoryByUser };
