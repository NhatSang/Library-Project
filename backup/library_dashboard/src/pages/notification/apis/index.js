import {api,api2} from '../../../apis/config';

const _getNotifications = async () => {
    const url = '/notifications';
    const response = await api.get(url);
    return response;
};

const _createNotification = async (data) => {
    const url = '/create-notification';
    const response = await api2.post(url,data);
    return response;
};

const _updateNotification = async (data) => {
    const url = '/update-notification';
    const response = await api2.post(url,data);
    return response;
}

const _sendNotification = async (id_notification) => {
    const url = '/update-sending';
    const response = await api2.post(url,{
        id_notification
    });
    return response;
}

const _deleteNotification = async (id_notification) => {
    const url = '/delete-notification';
    const response = await api2.post(url,{
        id_notification
    });
    return response;
}

export {_getNotifications,_createNotification,_updateNotification,_sendNotification,_deleteNotification};