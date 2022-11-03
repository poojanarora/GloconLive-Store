import {setLoading, setAuth} from './appAction';
import {
  localStorageSetItem,
  localStorageRemoveItem,
} from '../hooks/useAsyncStorage';
import showAlertPopup from '../components/AlertComp';
import axiosPublic from '../config/publicApi';
import {initializeZim, logoutZimChat} from './chatActions';

/**
 * Function to handle Login.
 */
export const handleLogin = (formValues, loginCallback) => async dispatch => {
  const {email} = formValues;
  try {
    dispatch(setLoading(true));
    let response = await axiosPublic.post('/store/login', formValues);
    if (response.data.success === true) {
      let obj = {
        accessToken: response.data?.token,
        email,
        isLoggedIn: true,
      };
      localStorageSetItem(obj);
      dispatch(setAuth(obj));
      dispatch(setLoading(false));
      loginCallback(true);
      dispatch(initializeZim());
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    console.log('In catch block');
    dispatch(setLoading(false));
    if (error?.message === 'Network Error') {
      showAlertPopup(
        error?.message,
        'Please check your internet connectivity.',
        'Ok',
      );
    } else {
      showAlertPopup('Opps', error?.message, 'Cancel');
    }
  }
};

/**
 * Function to handle Logout.
 */
export const handleLogout = obj => async dispatch => {
  await localStorageRemoveItem();
  dispatch(logoutZimChat());
  dispatch(setAuth(obj));
};
