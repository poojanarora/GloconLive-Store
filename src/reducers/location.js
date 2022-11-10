import {locationActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const location = (state = initialState.location, action) => {
  switch (action.type) {
    case locationActionTypes.STORE_LOCATION:
      //return action.payload;
      return {
        ...state,
        storeLocations: action.payload,
      };
    case locationActionTypes.APPEND_LOCATION:
      return {
        ...state,
        storeLocations: [...state.storeLocations, action.payload],
      };
    //return [...state, action.payload];
    case locationActionTypes.UPDATE_LOCATION: {
      const index = state.storeLocations.findIndex(
        location => location.id === action.payload.id,
      );
      const newArray = [...state.storeLocations];
      newArray[index] = action.payload;
      return {
        ...state,
        storeLocations: newArray,
      };
    }
    //return newArray;
    default:
      return state;
  }
};
export default location;
