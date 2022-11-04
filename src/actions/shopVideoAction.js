import {shopVideoActionTypes} from '../actionTypes/actionTypes';
import {setLoading} from './appAction';
import axiosPrivate from '../config/privateApi';

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
      formdata.append('video', video);
      const response = await axiosPrivate.post('/store/upload-video', formdata);
      if (response.data.success === true) {
        dispatch(setLoading(false));
        showAlertPopup('Success', response.data?.message, 'Ok');
      } else {
        dispatch(setLoading(false));
        showAlertPopup('Opps', response.data?.message, 'Cancel');
      }
    } catch (error) {
      console.log('In upload video catch block');
      console.log(error);
      dispatch(setLoading(false));
      showAlertPopup('Opps', error?.message, 'Cancel');
    }
  };
