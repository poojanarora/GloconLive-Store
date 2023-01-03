import {departmentActionTypes} from '../actionTypes/actionTypes';
import {emitEvent, setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { SUBSCRIPTION_EVENTS } from '../utils/appConstants';

/**
 * Function to fetch departments.
 */
export const fetchDepartments = locationId => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/shopper/get-departments', {
      location_id: locationId,
    });
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(storeDepartments(data));
      dispatch(setLoading(false));
    } else if(response.data.is_subscribed) {
      dispatch(setLoading(false));
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch departments catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to add department.
 */
export const addDepartment = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/add-department', formValues);
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(appendDepartment(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    }else if(response.data.is_subscribed) {
      dispatch(setLoading(false));
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add department catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to update department.
 */
export const updateDeparment = formValues => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post(
      '/store/update-department',
      formValues,
    );
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(modifyDepartment(data));
      dispatch(setLoading(false));
      showAlertPopup('Success', response.data?.message, 'Ok');
    } else if(response.data.is_subscribed) {
      dispatch(setLoading(false));
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update deparment catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to store departments.
 */
export const storeDepartments = departments => {
  return {
    type: departmentActionTypes.STORE_DEPARTMENT,
    payload: departments,
  };
};

/**
 * Function to store newly added department.
 */
export const appendDepartment = department => {
  return {
    type: departmentActionTypes.APPEND_DEPARTMENT,
    payload: department,
  };
};

/**
 * Function to update particular department.
 */
export const modifyDepartment = department => {
  return {
    type: departmentActionTypes.UPDATE_DEPARTMENT,
    payload: department,
  };
};
