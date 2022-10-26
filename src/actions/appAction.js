import { actionTypes } from "../actionTypes/actionTypes";

export const setLoading = (isLoading) => {
  return {
    type: actionTypes.IS_LOADING,
    payload: isLoading,
  };
}

export const setAuthConfig = (authConfig) => {
  return {
    type: actionTypes.SET_AUTH_CONFIG,
    payload: authConfig,
  };
}
