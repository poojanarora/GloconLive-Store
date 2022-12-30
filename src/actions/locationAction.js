import {locationActionTypes} from '../actionTypes/actionTypes';
import {setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
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
    showAlertPopup('Oops', error?.message, 'Cancel');
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
 * Function to add location.
 */
export const addLocationVideo = formValues => async dispatch => {
  try {
    console.log('In add loaction video action', formValues);
    //dispatch(setLoading(true));
    const formdata = new FormData();
    formdata.append('store_id', formValues.store_id);
    formdata.append('location_id', formValues.location_id);
    formdata.append('video_title', formValues.video_title);
    //formdata.append('video', formValues.video);
    // formdata.append('video', {
    //   uri: formValues.video.fileCopyUri
    //     ? formValues.video.uri
    //     : formValues.video.uri,
    //   type: formValues.video.type,
    //   name: formValues.video.name,
    // });
    formdata.append('video', {
      type: 'video/mp4',
      uri: formValues.video.fileCopyUri,
      name: formValues.video.name,
    });
    console.log('add loaction video form data ', formdata);
    //let response = await axiosPrivate.post('/store/upload-video', formdata);
    // if (response.data.success === true) {
    //   const data = response.data?.data;
    //   dispatch(setLoading(false));
    //   showAlertPopup('Success', response.data?.message, 'Ok');
    // } else {
    //   dispatch(setLoading(false));
    //   showAlertPopup('Oops', response.data?.message, 'Cancel');
    // }

    //Example using fetch
    const token = await localStorageGetAccessToken();
    let res = await fetch(
      'https://glocon-live.katdev.com/api/store/upload-video',
      {
        method: 'post',
        body: formdata,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data;',
          token: token,
        },
      },
    );
    let response = await res.json();
    console.log('add loaction video response ', response);
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add location video catch block', error);
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};
