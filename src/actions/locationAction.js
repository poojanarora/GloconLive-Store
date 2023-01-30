import { locationActionTypes } from '../actionTypes/actionTypes';
import { emitEvent, setLoading } from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { localStorageGetAccessToken } from '../hooks/useAsyncStorage';
import { MESSAGE_CONST, SUBSCRIPTION_EVENTS } from '../utils/appConstants';

/**
 * Function to fetch locations.
 */
export const fetchStoreVideo = (storeId, locationId) => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-location-video', {
      store_id: storeId,
      location_id: locationId
    });
    if (response.data.success === true) {
      const video = response.data?.data;
      console.warn(video);
      dispatch(setStoreVideo(video));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      AlertComp(
        MESSAGE_CONST.OOPS,
        response.data?.message,
        MESSAGE_CONST.CANCEL,
      );
    }
  } catch (error) {
    console.log('In fetch store video catch block');
    dispatch(setLoading(false));
    const { status, data } = error.response;
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.UPGRADE_SUBSCRIPTION));
    } else {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
  }
};

const setStoreVideo = video => {
  return {
    type: locationActionTypes.SET_STORE_LOCATION_VIDEO,
    payload: video,
  };
};

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
    const { status, data } = error.response;
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
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
    const { status, data } = error.response;
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
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
    const { status, data } = error.response;
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
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
        ? formValues.video.fileCopyUri
        : formValues.video.uri,
      type: formValues.video.type,
      name: formValues.video.name || `${formValues.video_title}_${formValues.store_id}_${formValues.location_id}`,
    });
    console.log(formValues);
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
    const { status, data } = error.response;
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
  }
};
