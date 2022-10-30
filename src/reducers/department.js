import {departmentActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const department = (state = initialState.department, action) => {
  switch (action.type) {
    case departmentActionTypes.STORE_DEPARTMENT:
      return action.payload;
    case departmentActionTypes.APPEND_DEPARTMENT:
      return [...state, action.payload];
    case departmentActionTypes.UPDATE_DEPARTMENT:
      const index = state.findIndex(
        department => department.id === action.payload.id,
      );
      const newArray = [...state];
      newArray[index] = action.payload;
      return newArray;
    default:
      return state;
  }
};
export default department;
