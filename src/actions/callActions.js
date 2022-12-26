import {setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import {callActionTypes} from '../actionTypes/actionTypes';
import axiosPrivate from '../config/privateApi';
import {CALL_STATUS, LOGIN_MODES} from '../utils/appConstants';

export const getIncomingCallQueue = (onApiSuccess) => async (dispatch, getState) => {
  try {
    const {profile, app} = getState();
    let payload = {
      store_id: profile.id,
    };
    if (app.auth.loginMode === LOGIN_MODES.DEVICE) {
      payload = {
        department_id: app.auth.departmentId,
      };
    }
    dispatch(setLoading(true));
    let response = await axiosPrivate.post(
      '/store/get-incomming-call-details',
      payload,
    );
    if (response.data.success === true) {
      const data = response.data?.data;
      const formattedData = getFormattedCallQueue(data);
      dispatch(setIncomingCallQueue(formattedData));
      dispatch(setLoading(false));
      onApiSuccess(response.data.isTrialPeriodEnd);
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch incoming call queue catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

const setIncomingCallQueue = callQueue => {
  return {
    type: callActionTypes.SET_INCOMING_CALL_QUEUE,
    payload: callQueue,
  };
};

const getFormattedCallQueue = data => {
  const callQueue = [];
  data.forEach(c => {
    if (c.status === CALL_STATUS.WAITING) {
      const call = {
        storeId: c.store_id,
        shopperId: c.shopper_id,
        shopperName: `${c.get_user_information?.first_name} ${c.get_user_information?.last_name}`,
        departmentId: c.department_id,
        shopperCallerId: c.get_user_information?.shopper_caller_id,
        departmentCallerId: c.get_store_department?.department_caller_id,
        callId: c.call_id,
        callStartTime: c.call_start_time,
      };
      callQueue.push(call);
    }
  });
  return callQueue;
};

export const updateCallStatus = (callId, status, onStatusUpdate) => async dispatch => {
  try {
    payload = {
      call_id: callId,
      call_status: status,
    }
    dispatch(setLoading(true));
    let response = await axiosPrivate.post('/store/call-status-update', payload);
    if (response.data.success === true) {
      dispatch(setLoading(false));
      onStatusUpdate(callId);
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In update call status catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};
