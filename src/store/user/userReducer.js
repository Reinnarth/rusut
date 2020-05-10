import { FETCH_USER_SUCCESS } from "./userConstants";
const initialState = {
  user: {},
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
}
