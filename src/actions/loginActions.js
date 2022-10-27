import {loginActionTypes} from '../actionTypes/actionTypes';
import {setLoading, setAuthConfig} from './appAction';
import {localStorageSetItem} from '../hooks/useAsyncStorage';
import showAlertPopup from '../components/AlertComp';
import axiosPublic from '../config/publicApi';

/**
 * Function to handle Login.
 */
export const handleLoginDemo =
  (formValues, loginCallback) => async dispatch => {
    const {email} = formValues;
    try {
      let response = await axiosPublic.post('/store/login', formValues);
      if (response.data.success === true) {
        let obj = {
          accessToken: response.data?.token,
          storeId: '',
          email,
          isLoggedIn: true,
        };
        dispatch(setAuthConfig(obj));
        localStorageSetItem(obj);
        dispatch(setLoading(false));
        loginCallback(true);
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

const setFormErrors = validateResponse => dispatch => {
  dispatch({
    type: loginActionTypes.SET_LOGIN_ERRORS,
    payload: validateResponse,
  });
};
