import axios from 'axios';
import { getToken } from '../utils/storage';

export const api = axios.create({
    baseURL: 'http://192.168.2.34:6001/api/v1',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const api2 = axios.create({
    baseURL: 'http://192.168.2.34:5001/api/v1',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export const api3 = axios.create({
    baseURL: 'http://10.0.2.2:5002/api',
    timeout: 6000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async function (config) {
        const token = await getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        config.params = {
            ...config.params,
            // locale: getDeviceLanguage(),
        };
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    function (response) {
        // Do something with response data
        return response.data;
    },
    function (error) {
        if (error.response) {
            if (error.response.status === 403) {
                //logout
            }
            if (error.response.status === 401) {
                // _retrieveData('login_data').then(data => {
                //     if (data) {
                //         error.config.headers.Authorization =
                //             'Bearer ' + data.token;
                //         return api(error.config);
                //     }
                // });
            }
        }

        return Promise.reject(error);
    },
);
