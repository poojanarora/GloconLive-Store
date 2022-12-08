import { profileActionTypes } from '../actionTypes/actionTypes';
import { setLoading } from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { zimLogin } from './chatActions';

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
        profilePic: data.profile_image,
        videoTitle: data.video_title,
        video: data.video_url,
      };
      dispatch(storeProfile(profileObj));
      dispatch(setLoading(false));
      // const loginForm = { userID: data.id.toString(), userName: data.name };
      // dispatch(zimLogin(loginForm));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
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
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    console.log('In catch block');
    dispatch(setLoading(false));
    showAlertPopup('Oops', error?.message, 'Cancel');
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

/**
 * Function to update profile information.
 */
export const updateProfileInformation = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    const formdata = new FormData();
    formdata.append('store_id', formValues.store_id);
    formdata.append('company_name', formValues.company_name);
    formdata.append('email', formValues.email);
    if (Object.keys(formValues.profile_image).length > 0) {
      formdata.append('profile_image', {
        uri: formValues.profile_image.uri,
        type: formValues.profile_image.type,
        name: formValues.profile_image.fileName,
      });
    }
    let response = await axiosPrivate.post(
      '/store/update-store-profile',
      formdata,
    );
    if (response.data.success === true) {
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In profile update catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};
