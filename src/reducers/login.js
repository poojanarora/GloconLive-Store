import {loginActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const login = (state = initialState.login, action) => {
  switch (action.type) {
    case loginActionTypes.SET_LOGIN_ERRORS:
      return {
        ...state,
        loginErrors: action.payload,
      };
    default:
      return state;
  }
};
export default login;
