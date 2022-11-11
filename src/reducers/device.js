import {deviceActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const device = (state = initialState.device, action) => {
  switch (action.type) {
    case deviceActionTypes.STORE_DEVICE:
      return {
        ...state,
        storeDevices: action.payload,
      };
    case deviceActionTypes.APPEND_DEVICE:
      return {
        ...state,
        storeDevices: [...state.storeDevices, action.payload],
      };
    case deviceActionTypes.UPDATE_DEVICE: {
      const index = state.storeDevices.findIndex(
        device => device.id === action.payload.id,
      );
      const newArray = [...state.storeDevices];
      newArray[index] = action.payload;
      return {
        ...state,
        storeDevices: newArray,
      };
    }
    default:
      return state;
  }
};
export default device;
