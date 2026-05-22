import { shopVideoActionTypes } from '../actionTypes/actionTypes';
import { initialState } from '../state/initialState';

const shopVideoPreview = (state = initialState.shopVideoPreview, action) => {
  switch (action.type) {
    case shopVideoActionTypes.SET_SHOP_VIDEO:
      return {
        ...state,
        shopVideo: action.payload,
      };
    case shopVideoActionTypes.SET_SHOP_VIDEO_TITLE:
      return {
        ...state,
        shopVideoTitle: action.payload,
      };
    case shopVideoActionTypes.SET_SHOP_VIDEO_UPLOAD_STATE:
      return {
        ...state,
        upload: {
          ...state.upload,
          ...action.payload,
        },
      };
    case shopVideoActionTypes.DISMISS_SHOP_VIDEO_UPLOAD_BANNER:
      return {
        ...state,
        upload: {
          ...state.upload,
          visible: false,
        },
      };
    case shopVideoActionTypes.RESET_SHOP_VIDEO_FORM:
      return {
        ...state,
        shopVideoTitle: '',
        shopVideo: null,
      };
    default:
      return state;
  }
};
export default shopVideoPreview;
