import {loginActionTypes} from '../actionTypes/actionTypes';
import {LOGIN_CONST} from '../utils/appConstants';
import {validate} from '../utils/Validation';
import {setLoading, setAuthConfig} from './appAction';
import showAlertPopup from '../components/AlertComp';

/**
 * Function to handle Login.
 */
export const handleLogin = (formValues, loginCallback) => async dispatch => {
  const {email, password} = formValues;
  try {
    const validateResponse = {
      ...validate(LOGIN_CONST.EMAIL, email),
      ...validate(LOGIN_CONST.PASSWORD, password),
    };
    if (Object.keys(validateResponse).length > 0) {
      dispatch(setFormErrors(validateResponse));
    } else {
      setLoading(true);
      let response = await axiosPublic.post('/store/login', formValues);
      if (response.data.success === true) {
        let obj = {
          accessToken: response.data?.token,
          storeId: '',
          email,
          isLoggedIn: true,
        };
        dispatch(setAuthConfig(obj));
        // localStorageSetItem(obj);
        setLoading(false);
        loginCallback(true);
      } else {
        setLoading(false);
        showAlertPopup('Opps', response.data?.message, 'Cancel');
      }
    }
  } catch (error) {
    console.log('In catch block');
    setLoading(false);
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
