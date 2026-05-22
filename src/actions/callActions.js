import {emitEvent, setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import {callActionTypes} from '../actionTypes/actionTypes';
import axiosPrivate from '../config/privateApi';
import {CALL_STATUS, LOGIN_MODES, MESSAGE_CONST, SUBSCRIPTION_EVENTS} from '../utils/appConstants';

export const getIncomingCallQueue =
  ({showLoader = true, showErrorPopup = true} = {}) =>
  async (dispatch, getState) => {
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
    if (showLoader) {
      dispatch(setLoading(true));
    }
    let response = await axiosPrivate.post(
      '/store/get-incomming-call-details',
      payload,
    );
    if (response.data.success === true) {
      const data = response.data?.data;
      const formattedData = getFormattedCallQueue(data);
      dispatch(setIncomingCallQueue(formattedData));
      if (showLoader) {
        dispatch(setLoading(false));
      }
    } else {
      if (showLoader) {
        dispatch(setLoading(false));
      }
      if (showErrorPopup) {
        showAlertPopup('Oops', response.data?.message, 'Cancel');
      }
    }
  } catch (error) {
    if (showLoader) {
      dispatch(setLoading(false));
    }
    console.log('In fetch incoming call queue catch block');
    const { status, data } = error.response || {};
    if (status === 401 && 'is_subscribed' in data && !data.is_subscribed) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else if (showErrorPopup) {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
  }
};

const setIncomingCallQueue = callQueue => {
  return {
    type: callActionTypes.SET_INCOMING_CALL_QUEUE,
    payload: callQueue,
  };
};

export const removeIncomingCall = callId => {
  return {
    type: callActionTypes.REMOVE_INCOMING_CALL,
    payload: callId,
  };
};

const getFormattedCallQueue = data => {
  const callQueue = [];
  data.forEach(c => {
    if (c.status === CALL_STATUS.WAITING && c.get_store_department?.department_caller_id) {
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

export const updateCallStatus =
  (
    callId,
    status,
    onStatusUpdate,
    {showLoader = true, showErrorPopup = true} = {},
  ) =>
  async dispatch => {
  try {
    const payload = {
      call_id: callId,
      call_status: status,
    };
    if (showLoader) {
      dispatch(setLoading(true));
    }
    let response = await axiosPrivate.post('/store/call-status-update', payload);
    if (response.data.success === true) {
      if (showLoader) {
        dispatch(setLoading(false));
      }
      if (typeof onStatusUpdate === 'function') {
        onStatusUpdate(callId);
      }
      return response.data;
    } else {
      if (showLoader) {
        dispatch(setLoading(false));
      }
      if (showErrorPopup) {
        showAlertPopup('Oops', response.data?.message, 'Cancel');
      }
      return null;
    }
  } catch (error) {
    if (showLoader) {
      dispatch(setLoading(false));
    }
    console.log('In update call status catch block');
    const {status: responseStatus, data} = error.response || {};
    if (
      responseStatus === 401 &&
      data &&
      'is_subscribed' in data &&
      !data.is_subscribed
    ) {
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else if (showErrorPopup) {
      showAlertPopup(MESSAGE_CONST.OOPS, error?.message, MESSAGE_CONST.CANCEL);
    }
    throw error;
  }
};
