import { locationActionTypes } from '../actionTypes/actionTypes';
import { initialState } from '../state/initialState';

const location = (state = initialState.location, action) => {
  switch (action.type) {
    case locationActionTypes.STORE_LOCATION:
      return {
        ...state,
        storeLocations: action.payload,
      };
    case locationActionTypes.APPEND_LOCATION:
      return {
        ...state,
        storeLocations: [...state.storeLocations, action.payload],
      };
    case locationActionTypes.UPDATE_LOCATION: {
      const index = state.storeLocations.findIndex(
        locationItem => locationItem.id === action.payload.id,
      );
      const newArray = [...state.storeLocations];
      newArray[index] = action.payload;
      return {
        ...state,
        storeLocations: newArray,
      };
    }
    case locationActionTypes.SET_STORE_LOCATION_VIDEO:
      return {
        ...state,
        selectedLocationVideo: action.payload,
      };
    case locationActionTypes.SET_LOCATION_VIDEO_UPLOAD_STATE:
      return {
        ...state,
        locationVideoUpload: {
          ...state.locationVideoUpload,
          ...action.payload,
        },
      };
    case locationActionTypes.DISMISS_LOCATION_VIDEO_UPLOAD_BANNER:
      return {
        ...state,
        locationVideoUpload: {
          ...state.locationVideoUpload,
          visible: false,
        },
      };
    default:
      return state;
  }
};
export default location;
