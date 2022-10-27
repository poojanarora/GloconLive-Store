import { shopVideoActionTypes } from "../actionTypes/actionTypes";

export const handleVideoSelection = video => {
    return {
      type: shopVideoActionTypes.SET_SHOP_VIDEO,
      payload: video,
    };
  };
