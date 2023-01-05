import {setLoading, setAuth} from './appAction';
import {
  localStorageSetItem,
  localStorageRemoveItem,
} from '../hooks/useAsyncStorage';
import showAlertPopup from '../components/AlertComp';
import axiosPublic from '../config/publicApi';
import axiosPrivate from '../config/privateApi';
import {initializeZim, logoutZimChat} from './chatActions';
import {LOGIN_MODES, SUBSCRIPTION_EVENTS} from '../utils/appConstants';

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
        loginMode: LOGIN_MODES.STORE,
      };
      localStorageSetItem(obj);
      dispatch(setAuth(obj));
      dispatch(setLoading(false));
      loginCallback(response.data.terms_and_conditions_accepted);
      // dispatch(initializeZim());
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
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
      showAlertPopup('Oops', error?.message, 'Cancel');
    }
  }
};

/**
 * Function to handle conceirge Login.
 */
export const handleConceirgeLogin =
  (formValues, loginCallback) => async dispatch => {
    const {email} = formValues;
    try {
      dispatch(setLoading(true));
      let response = await axiosPublic.post(
        '/conceirge-shopper/login',
        formValues,
      );
      if (response.data.success === true) {
        let obj = {
          accessToken: response.data?.token,
          email,
          isLoggedIn: true,
          loginMode: LOGIN_MODES.CONCEIRGE,
        };
        localStorageSetItem(obj);
        dispatch(setAuth(obj));
        dispatch(setLoading(false));
        loginCallback(true);
        // dispatch(initializeZim());
      } else {
        dispatch(setLoading(false));
        showAlertPopup('Oops', response.data?.message, 'Cancel');
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
        showAlertPopup('Oops', error?.message, 'Cancel');
      }
    }
  };

/**
 * Function to handle terms and conditions.
 */
export const updateTermsAndConditionFlag =
  (payload, termsAndConditionCallBack) => async dispatch => {
    try {
      dispatch(setLoading(true));
      let response = await axiosPrivate.post(
        '/store/update-terms-and-conditions',
        payload,
      );
      if (response.data.success === true) {
        dispatch(setLoading(false));
        termsAndConditionCallBack(true);
      } else {
        dispatch(setLoading(false));
        showAlertPopup('Oops', response.data?.message, 'Cancel');
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
        showAlertPopup('Oops', error?.message, 'Cancel');
      }
    }
  };

/**
 * Function to handle Logout.
 */
export const handleLogout = obj => async dispatch => {
  await localStorageRemoveItem();
  // dispatch(logoutZimChat());
  dispatch(setAuth(obj));
};
