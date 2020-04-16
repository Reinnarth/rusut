import { FETCH_USER_SUCCESS, FETCH_USER_AMOUNT_SUCCESS } from "./userConstants";
const initialState = {
  amount: null,
  users: []
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        amount: action.amount,
        };

    default:
      return state;
  }
}
