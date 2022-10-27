import {profileActionTypes} from '../actionTypes/actionTypes';
import {setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';

/**
 * Function to fetch profile information.
 */
export const fetchProfileInfo = email => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-profile', {
      email: email,
    });
    if (response.data.success === true) {
      const data = response.data?.data;
      const profileObj = {
        id: data.id,
        companyName: data.company_name,
        email: data.email,
        industry: data.industry,
        name: data.name,
        phone: data.phone,
        status: data.status,
        subscriptionId: data.subscription_id,
        subscriptionStartDate: data.subscription_start_date,
        titlePosition: data.title_position,
      };
      dispatch(storeProfile(profileObj));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
  }
};

/**
 * Function to change password.
 */
export const changePassword = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    const response = await axiosPrivate.post(
      '/store/update-password',
      formValues,
    );
    if (response.data.success === true) {
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    console.log('In catch block');
    dispatch(setLoading(false));
    showAlertPopup('Opps', error?.message, 'Cancel');
  }
};

/**
 * Function to store profile information.
 */
export const storeProfile = profile => {
  return {
    type: profileActionTypes.STORE_PROFILE,
    payload: profile,
  };
};
