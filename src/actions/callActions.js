import { setLoading } from "./appAction";
import showAlertPopup from '../components/AlertComp';
import { callActionTypes } from "../actionTypes/actionTypes";
import axiosPrivate from "../config/privateApi";

export const getIncomingCallQueue = () => async (dispatch, getState) => {
    try {
      const storeId = getState().profile.id;
      dispatch(setLoading(true));
      let response = await axiosPrivate.post('', {
        storeId: storeId,
      });
  
      if (response.data.success === true) {
        const data = response.data?.data;
        dispatch(setIncomingCallQueue(data));
        dispatch(setLoading(false));
      } else {
        dispatch(setLoading(false));
        showAlertPopup('Oops', response.data?.message, 'Cancel');
      }
    } catch (error) {
      dispatch(setLoading(false));
      console.log('In fetch Device catch block');
    //   showAlertPopup('Oops', error?.message, 'Cancel');
    }
  };

  const setIncomingCallQueue = callQueue => {
    return {
        type: callActionTypes.SET_INCOMING_CALL_QUEUE,
        payload: callQueue,
      };
  }