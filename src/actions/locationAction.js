import { locationActionTypes } from '../actionTypes/actionTypes';
import { emitEvent, setLoading } from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { MESSAGE_CONST, SUBSCRIPTION_EVENTS } from '../utils/appConstants';
import { buildMultipartVideoFilename } from '../utils/videoUploadFilename';

/**
 * Function to fetch locations.
 */
export const fetchStoreVideo = (storeId, locationId) => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-location-video', {
      store_id: storeId,
      location_id: locationId,
    });
    if (response.data.success === true) {
      const video = response.data?.data;
      console.warn(video);
      dispatch(setStoreVideo(video));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      showAlertPopup(
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

export const setLocationVideoUploadState = payload => {
  return {
    type: locationActionTypes.SET_LOCATION_VIDEO_UPLOAD_STATE,
    payload,
  };
};

export const dismissLocationVideoUploadBanner = () => {
  return {
    type: locationActionTypes.DISMISS_LOCATION_VIDEO_UPLOAD_BANNER,
  };
};

/**
 * Function to fetch locations.
 */
export const fetchLocations =
  (storeId, options = {}) =>
  async dispatch => {
    const { showLoader = true, showErrorPopup = true } = options;
    try {
      if (showLoader) {
        dispatch(setLoading(true));
      }
      let response = await axiosPrivate.post('/store/get-locations', {
        store_id: storeId,
      });
      if (response.data.success === true) {
        const data = response.data?.data;
        dispatch(storeLocations(data));
        if (showLoader) {
          dispatch(setLoading(false));
        }
      } else {
        if (showLoader) {
          dispatch(setLoading(false));
        }
        if (showErrorPopup) {
          showAlertPopup('Oops', response.data?.message, 'Cancel');
        }
      }
    } catch (error) {
      if (showLoader) {
        dispatch(setLoading(false));
      }
      console.log('In fetch locations catch block');
      const { status, data } = error.response || {};
      if (
        status === 401 &&
        data &&
        'is_subscribed' in data &&
        !data.is_subscribed
      ) {
        dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
      } else if (showErrorPopup) {
        showAlertPopup(
          MESSAGE_CONST.OOPS,
          error?.message,
          MESSAGE_CONST.CANCEL,
        );
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
export const addLocationVideo =
  (formValues, options = {}) =>
  async dispatch => {
    const {
      showLoader = true,
      showSuccessPopup = true,
      showErrorPopup = true,
    } = options;
    const uploadRequestStartedAt = Date.now();
    const uploadRequestStartedIso = new Date(
      uploadRequestStartedAt,
    ).toISOString();
    try {
      if (showLoader) {
        dispatch(setLoading(true));
      }
      const uploadUri = formValues.video.fileCopyUri
        ? formValues.video.fileCopyUri
        : formValues.video.uri;
      const formdata = new FormData();
      formdata.append('store_id', formValues.store_id);
      formdata.append('location_id', formValues.location_id);
      formdata.append('video_title', formValues.video_title);
      const videoPartName = buildMultipartVideoFilename(
        formValues.video,
        `${formValues.video_title}_${formValues.store_id}_${formValues.location_id}`,
      );
      formdata.append('video', {
        uri: uploadUri,
        type: formValues.video.type,
        name: videoPartName,
        // Android FormData uses `filename` for Content-Disposition on some RN versions
        filename: videoPartName,
      });
      dispatch(
        setLocationVideoUploadState({
          status: 'uploading',
          visible: true,
          message: 'Uploading location video in background...',
          locationId: formValues.location_id,
          locationName: formValues.locationName || '',
          startedAt: uploadRequestStartedIso,
          completedAt: null,
          error: '',
        }),
      );

      let response = await axiosPrivate.post('/store/upload-video', formdata, {
        timeout: 10 * 60 * 1000,
      });
      const uploadRequestEndedAt = Date.now();

      if (response.data.success === true) {
        dispatch(
          setLocationVideoUploadState({
            status: 'success',
            visible: true,
            message:
              response.data?.message || 'Location video uploaded successfully.',
            completedAt: new Date(uploadRequestEndedAt).toISOString(),
            error: '',
          }),
        );
        if (showLoader) {
          dispatch(setLoading(false));
        }
        if (showSuccessPopup) {
          showAlertPopup('Success', response.data?.message, 'Ok');
        }
        return true;
      } else {
        dispatch(
          setLocationVideoUploadState({
            status: 'error',
            visible: true,
            message: response.data?.message || 'Location video upload failed.',
            completedAt: new Date(uploadRequestEndedAt).toISOString(),
            error: response.data?.message || 'Location video upload failed.',
          }),
        );
        if (showLoader) {
          dispatch(setLoading(false));
        }
        if (showErrorPopup) {
          showAlertPopup('Oops', response.data?.message, 'Cancel');
        }
        return false;
      }
    } catch (error) {
      if (showLoader) {
        dispatch(setLoading(false));
      }
      const uploadRequestEndedAt = Date.now();
      console.log('In add location video catch block', error);
      dispatch(
        setLocationVideoUploadState({
          status: 'error',
          visible: true,
          message:
            error?.message === 'Network Error'
              ? 'Location video upload was interrupted. Please reopen this flow and try again.'
              : error?.message || 'Location video upload failed.',
          completedAt: new Date(uploadRequestEndedAt).toISOString(),
          error: error?.message || 'Location video upload failed.',
        }),
      );
      const { status, data } = error.response || {};
      if (
        status === 401 &&
        data &&
        'is_subscribed' in data &&
        !data.is_subscribed
      ) {
        dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
      } else if (showErrorPopup) {
        showAlertPopup(
          MESSAGE_CONST.OOPS,
          error?.message,
          MESSAGE_CONST.CANCEL,
        );
      }
      return false;
    }
  };
