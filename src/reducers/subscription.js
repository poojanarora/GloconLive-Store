import {subscriptionActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const subscription = (state = initialState.subscription, action) => {
  switch (action.type) {
    case subscriptionActionTypes.SET_SUBSCRIPTION_DETAILS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default subscription;
