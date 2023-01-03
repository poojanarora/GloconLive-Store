import {subscriptionActionTypes} from '../actionTypes/actionTypes';
import {emitEvent, setLoading} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';
import { SUBSCRIPTION_EVENTS } from '../utils/appConstants';

/**
 * Function to subscription details.
 */
export const fetchSubscriptionInfo = storeId => async dispatch => {
  try {
    dispatch(setLoading(true));
    let response = await axiosPrivate.post(
      'store/get-store-device-subscription',
      {
        store_id: storeId,
      },
    );
    if (response.data.success === true) {
      const data = response.data;
      dispatch(
        storeSubscriptionInfo({
          alreadyAddedDeviceCount: data.device_count,
          deviceBaseLimit: data.device_base_limit,
          perDeviceFee: data.per_device_fee,
          perDeviceFeeAboveBaseLimit: data.per_device_fee_above_base_limit,
        }),
      );
      dispatch(setLoading(false));
    } else if(response.data.is_subscribed) {
      dispatch(setLoading(false));
      dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
    } else {
      dispatch(setLoading(false));
      showAlertPopup('Oops', response.data?.message, 'Cancel');
    }
  } catch (error) {
    dispatch(setLoading(false));
    console.log('In fetch subscription details catch block');
    showAlertPopup('Oops', error?.message, 'Cancel');
  }
};

/**
 * Function to store locations.
 */
export const storeSubscriptionInfo = payload => {
  return {
    type: subscriptionActionTypes.SET_SUBSCRIPTION_DETAILS,
    payload: payload,
  };
};
