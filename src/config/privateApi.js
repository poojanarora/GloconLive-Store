import axios from 'axios';
import {localStorageGetAccessToken} from '../hooks/useAsyncStorage.js';
import showAlertPopup from '../components/AlertComp';

const API_URL = 'https://app.gloconlive.com/api';

const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
});

axiosPrivate.interceptors.request.use(
  async config => {
    const token = await localStorageGetAccessToken();
    config.headers['token'] = `${token}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosPrivate.interceptors.response.use(
  res => {
    return res;
  },
  async err => {
    if (err.response) {
      if (err.response.status === 0) {
        showAlertPopup(
          'Network Error',
          'Please check your internet connectivity.',
          'Cancel',
        );
      } else if (err.response.status === 401) {
        console.log('Token expired');
      }
    }
    return Promise.reject(err);
  },
);

export default axiosPrivate;
