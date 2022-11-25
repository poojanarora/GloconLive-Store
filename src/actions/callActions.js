import { setLoading } from "./appAction";
import showAlertPopup from '../components/AlertComp';
import { callActionTypes } from "../actionTypes/actionTypes";
import axiosPrivate from "../config/privateApi";
import { LOGIN_MODES } from "../utils/appConstants";

export const getIncomingCallQueue = () => async (dispatch, getState) => {
    try {
      const {profile , app} = getState();
      let payload = {
        store_id: profile.id,
      }
      if (app.auth.loginMode === LOGIN_MODES.DEVICE) {
        payload = {
          department_id: app.auth.departmentId
        }
      }
      dispatch(setLoading(true));
      let response = await axiosPrivate.post('/store/get-incomming-call-details', payload);
      if (response.data.success === true) {
        const data = response.data?.data;
        const formattedData = getFormattedCallQueue(data);
        dispatch(setIncomingCallQueue(formattedData));
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

  const getFormattedCallQueue = data => {
    const callQueue = [];
    data.forEach(c => {
      const call = {
        storeId: c.store_id,
        shopperId: c.shopper_id,
        shopperName: `${c.get_user_information.first_name} ${c.get_user_information.last_name}`,
        departmentId: c.department_id,
        shopperCallerId: c.get_user_information.shopper_caller_id,
        departmentCallerId: c.get_store_department.department_caller_id,
        callId: c.call_id,
        callStartTime: '10:00 am',
      };
      callQueue.push(call);
    });
    console.warn(callQueue)
    return callQueue;
  }
  