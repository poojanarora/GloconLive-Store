import {locationActionTypes} from '../actionTypes/actionTypes';
import {emitEvent, setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { SUBSCRIPTION_EVENTS } from '../utils/appConstants';
import {localStorageGetAccessToken} from '../hooks/useAsyncStorage';

/**
 * Function to fetch locations.
 */
export const fetchLocations = storeId => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-locations', {
      store_id: storeId,
    });
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(storeLocations(data));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch locations catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to add location.
 */
export const addLocation = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/add-location', formValues);
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(appendLocation(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add locations catch block');
    if (error.code === 300) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.UPGRADE_SUBSCRIPTION))
    } else {
      showAlertPopup('Oops', error?.message, 'Cancel');
    }
  }
};

/**
 * Function to update location.
 */
export const updateLocation = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post(
      '/store/update-location',
      formValues,
    );
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(modifyLocation(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update locations catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to store locations.
 */
export const storeLocations = locations => {
  return {
    type: locationActionTypes.STORE_LOCATION,
    payload: locations,
  };
};

/**
 * Function to append location.
 */
export const appendLocation = location => {
  return {
    type: locationActionTypes.APPEND_LOCATION,
    payload: location,
  };
};

/**
 * Function to update particular location.
 */
export const modifyLocation = location => {
  return {
    type: locationActionTypes.UPDATE_LOCATION,
    payload: location,
  };
};

/**
 * Function to add location video.
 */
export const addLocationVideo = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    const formdata = new FormData();
    formdata.append('store_id', formValues.store_id);
    formdata.append('location_id', formValues.location_id);
    formdata.append('video_title', formValues.video_title);
    formdata.append('video', {
      uri: formValues.video.fileCopyUri
        ? formValues.video.uri
        : formValues.video.uri,
      type: formValues.video.type,
      name: formValues.video.name,
    });
    let response = await axiosPrivate.post('/store/upload-video', formdata);
    if (response.data.success === true) {
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add location video catch block', error);
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};
