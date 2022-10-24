import { actionTypes } from "../actionTypes/actionTypes";

export const dummyAction = (data) => {
  return {
    type: actionTypes.APP_ACTION,
    payload: data,
  };
}
