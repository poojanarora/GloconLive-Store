import {deviceActionTypes} from '../actionTypes/actionTypes';
import {setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';

export const fetchDevices = locationId => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-location-devices', {
      location_id: locationId,
    });

    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(storeDevices(data));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oopps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch Device catch block');
    showAlertPopup('Oopps', error?.message, 'Cancel');
  }
};
/**
 * Function to add device.
 */
export const addDevice = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let resp = await axiosPrivate.post('/store/add-device', formValues);
    if (resp.data.success === true) {
      const data = resp.data?.data;
      //dispatch(appendDevices(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', resp.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', resp.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add device catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
  }
};

/**
 * Function to update department.
 */
export const updateDevice = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/update-device', formValues);
    if (response.data.success === true) {
      const data = response.data?.data;
      //dispatch(modifyDevices(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update device catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
  }
};

/**
 * Function to store devices.
 */
export const storeDevices = devices => {
  return {
    type: deviceActionTypes.STORE_DEVICE,
    payload: devices,
  };
};

/**
 * Function to store newly added devices.
 */
export const appendDevices = device => {
  return {
    type: deviceActionTypes.APPEND_DEVICE,
    payload: device,
  };
};

/**
 * Function to update perticular devices.
 */
export const modifyDevices = device => {
  return {
    type: deviceActionTypes.UPDATE_DEVICE,
    payload: device,
  };
};
