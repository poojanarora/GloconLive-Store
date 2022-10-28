import {profileActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const profile = (state = initialState.profile, action) => {
  switch (action.type) {
    case profileActionTypes.STORE_PROFILE:
      return {
        ...action.payload,
      };
    default:
      return state;
  }
};
export default profile;
