import {callActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const call = (state = initialState.call, action) => {
  switch (action.type) {
    case callActionTypes.SET_INCOMING_CALL_QUEUE:
      return {
        ...state,
        callQueue: [...action.payload],
      };
    case callActionTypes.REMOVE_INCOMING_CALL:
      return {
        ...state,
        callQueue: state.callQueue.filter(
          queueItem => queueItem.callId !== action.payload,
        ),
      };
    default:
      return state;
  }
};
export default call;
