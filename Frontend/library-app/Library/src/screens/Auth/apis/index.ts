import { iUser } from 'src/types/iUser';
import { api, api2 } from '../../../apis/configAPI';

const _loginMS = (userInfo: iUser) => {
    const url = '/loginms';
    return api.post(url, userInfo);
};

const _login = (user: iUser) => {
    const url = '/login';
    return api.post(url, user);
};

const _loginWithAccount = (user: iUser) => {
    const url = '/login-with-account';
    return api.post(url, {
        email: user.email,
        password: user.password,
    });
};

const _loginAccount = (user: iUser) => {
    const url = '/auth/login';
    return api2.post(url, {
        email: user.email,
        password: user.password,
    });
};

const _sendVerifyCode = (email: string) => {
    const url = '/auth/send-code';
    return api2.post(url, { email });
};

const _getMajors = () => {
    const url = '/majors';
    return api2.get(url);
};

const _postFcmToken = (data: any) => {
    const url = '/post-fcm-token';
    return api.post(url, data);
};

export {
    _getMajors,
    _login,
    _loginAccount,
    _loginMS,
    _loginWithAccount,
    _postFcmToken,
    _sendVerifyCode,
};
