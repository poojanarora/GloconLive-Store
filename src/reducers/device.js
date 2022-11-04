import { deviceActionTypes } from "../actionTypes/actionTypes";
import { initialState } from "../state/initialState";

const device = (state = initialState.device, action) => {
    switch (action.type) {
        case deviceActionTypes.STORE_DEVICE:
            return action.payload;
        case deviceActionTypes.APPEND_DEVICE:
            return [...state, action.payload];
        case deviceActionTypes.UPDATE_DEVICE:
            const index = state.findIndex(
                device => device.id === action.payload.id,
            );
            const newArray = [...state];
            newArray[index] = action.payload;
            return newArray;

        default:
            return state;
    }

}
export default device