import {actionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const app = (state = initialState.app, action) => {
  switch (action.type) {
    case actionTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case actionTypes.SET_AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case actionTypes.UPDATE_AUTH:
      return {
        ...state,
        auth: {
          ...state.auth,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
export default app;
