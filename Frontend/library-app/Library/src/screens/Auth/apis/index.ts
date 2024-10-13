import { iUser } from 'src/types/iUser';
import { api } from '../../../apis/configAPI';

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

export { _login, _loginMS, _loginWithAccount };
