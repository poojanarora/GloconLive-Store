import {updateAuth} from './appAction';
import showAlertPopup from '../components/AlertComp';
import axiosPrivate from '../config/privateApi';

/**
 * Function to fetch profile information.
 */
export const fetchProfileInfo =
  (email, fetchProfileInfoCallBack) => async dispatch => {
    try {
      let response = await axiosPrivate.post('/store/get-profile', {
        email: email,
      });
      if (response.data.success === true) {
        let obj = {
          storeId: response.data?.data?.id,
        };
        dispatch(updateAuth(obj));
        fetchProfileInfoCallBack(response.data?.data);
      } else {
        showAlertPopup('Opps', response.data?.message, 'Cancel');
      }
    } catch (error) {
      console.log('In catch block');
      showAlertPopup('Opps', error?.message, 'Cancel');
    }
  };
