import {departmentActionTypes} from '../actionTypes/actionTypes';
import {initialState} from '../state/initialState';

const department = (state = initialState.department, action) => {
  switch (action.type) {
    case departmentActionTypes.STORE_DEPARTMENT:
      return {
        ...state,
        storeDepartments: action.payload,
      };
    case departmentActionTypes.APPEND_DEPARTMENT:
      return {
        ...state,
        storeDepartments: [...state.storeDepartments, action.payload],
      };
    case departmentActionTypes.UPDATE_DEPARTMENT: {
      const index = state.storeDepartments.findIndex(
        department => department.id === action.payload.id,
      );
      const newArray = [...state.storeDepartments];
      newArray[index] = action.payload;
      return {
        ...state,
        storeDepartments: newArray,
      };
    }
    default:
      return state;
  }
};
export default department;
