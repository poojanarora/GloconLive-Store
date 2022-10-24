import { actionTypes } from "../actionTypes/actionTypes";
import { initialState } from "../state/initialState";

const app = (state = initialState.app, action) => {
  switch (action.type) {
    case actionTypes.APP_ACTION:
      return {
        ...state,
        // count: action.payload,
      };
    default:
      return state;
  }
};
export default app;
