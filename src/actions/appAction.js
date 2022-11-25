import {actionTypes} from '../actionTypes/actionTypes';

export const setLoading = isLoading => {
  return {
    type: actionTypes.IS_LOADING,
    payload: isLoading,
  };
};

export const setAuth = auth => {
  return {
    type: actionTypes.SET_AUTH,
    payload: auth,
  };
};

export const updateAuth = value => {
  return {
    type: actionTypes.UPDATE_AUTH,
    payload: value,
  };
};
