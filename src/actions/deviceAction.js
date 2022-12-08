import { deviceActionTypes } from '../actionTypes/actionTypes';
import { setAuth, setLoading } from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { localStorageSetItem } from '../hooks/useAsyncStorage';
import { LOGIN_MODES } from '../utils/appConstants';

export const fetchDevices = locationId => async dispatch => {
  try {
    console.log('In fetch device action');
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
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch Device catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};
/**
 * Function to add device.
 */
export const addDevice = (formValues, onDeviceAdded) => async dispatch => {
  try {
    dispatch(setLoading(true));
    let resp = await axiosPrivate.post('/store/add-device', formValues);
    const data = resp.data;
    console.log(data);
    if (data?.success === true) {
      console.log('In add device success');
      const deviceData = data?.data.store_device_data;
      // dispatch(appendDevices(data));
      dispatch(setDeviceData(deviceData))
      let obj = {
        accessToken: data?.data.api_token,
        email: formValues.device_id,
        isLoggedIn: true,
        loginMode: LOGIN_MODES.DEVICE,
        departmentId: deviceData.department_id,
        deviceName: deviceData.device_name,
      };
      localStorageSetItem(obj);
      dispatch(setAuth(obj));
      dispatch(setLoading(false));
      onDeviceAdded();
      showAlertPopup('Success', 'Device Added Successfully', 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', resp.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add device catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
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
      dispatch(modifyDevices(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update device catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
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
 * Function to set newly added devices.
 */
 export const setDeviceData = device => {
  return {
    type: deviceActionTypes.SET_DEVICE_DATA,
    payload: device,
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
