import {shopVideoActionTypes} from '../actionTypes/actionTypes';
import {emitEvent, setLoading} from './appAction';
import {storeProfile} from './profileActions';
import axiosPrivate from '../config/privateApi';
import { SUBSCRIPTION_EVENTS } from '../utils/appConstants';

export const handleVideoSelection = video => {
  return {
    type: shopVideoActionTypes.SET_SHOP_VIDEO,
    payload: video,
  };
};

export const handelVideoTitle = videoTitle => {
  return {
    type: shopVideoActionTypes.SET_SHOP_VIDEO_TITLE,
    payload: videoTitle,
  };
};

export const handelVideoUpload =
  (storeId, videoTitle, video) => async dispatch => {
    try {
      dispatch(setLoading(true));
      const formdata = new FormData();
      formdata.append('store_id', storeId);
      formdata.append('video_title', videoTitle);
      formdata.append('video', {
        uri: video.uri,
        type: video.type,
        name: video.fileName,
      });
      const response = await axiosPrivate.post('/store/upload-video', formdata);
      if (response.data.success === true) {
        console.log(response.data);
        const data = response.data?.data;
        const profileObj = {
          videoTitle: data.video_title,
          video: data.video_url,
        };
        dispatch(storeProfile(profileObj));
        dispatch(setLoading(false));
        showAlertPopup('Success', response.data?.message, 'Ok');
      } else if(response.data.is_subscribed) {
        dispatch(setLoading(false));
        dispatch(emitEvent(SUBSCRIPTION_EVENTS.SUBSCRIPTION_ENDED));
      } else {
        dispatch(setLoading(false));
        showAlertPopup('Oops', response.data?.message, 'Cancel');
      }
    } catch (error) {
      console.log('In upload video catch block');
      console.log(error);
      dispatch(setLoading(false));
      showAlertPopup('Oops', error?.message, 'Cancel');
    }
  };
