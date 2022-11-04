import {shopVideoActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

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
    default:
      return state;
  }
};
export default shopVideoPreview;
