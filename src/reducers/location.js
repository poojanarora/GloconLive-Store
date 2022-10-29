import {locationActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const location = (state = initialState.location, action) => {
  switch (action.type) {
    case locationActionTypes.STORE_LOCATION:
      return action.payload;
    case locationActionTypes.APPEND_LOCATION:
      return [...state, action.payload];
    case locationActionTypes.UPDATE_LOCATION:
      const index = state.findIndex(
        location => location.id === action.payload.id,
      );
      const newArray = [...state];
      newArray[index] = action.payload;
      return newArray;
    default:
      return state;
  }
};
export default location;
