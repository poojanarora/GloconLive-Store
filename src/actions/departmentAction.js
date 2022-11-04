import {departmentActionTypes} from '../actionTypes/actionTypes';
import {setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';

/**
 * Function to fetch departments.
 */
export const fetchDepartments = locationId => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/get-departments', {
      location_id: locationId,
    });
    if (response.data.success === true) {
      const data = response.data?.data;
      dispatch(storeDepartments(data));
      dispatch(setLoading(false));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch departments catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
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
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In add department catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
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
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Opps', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update deparment catch block');
    showAlertPopup('Opps', error?.message, 'Cancel');
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