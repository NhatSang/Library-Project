import { api } from '../../../apis/configAPI';

export type iLogin = {
    email: string,
    password: string,
};
const _login = async (data: iLogin) => {
    const url = '/auth/login-temp';
    return api.post(url, data);
};

export type iPostFCMToken = {
    userId: string,
    fcmToken: string,
    deviceId: string,
    platform: string,
};
const _postFCMToken = async (data: iPostFCMToken) => {
    const url = '/user/fcm-token';
    return api.post(url, data);
};

export { _login, _postFCMToken };
