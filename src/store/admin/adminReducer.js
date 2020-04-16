import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_AMOUNT_SUCCESS,
  CHANGE_LOCATION_SUCCESS,
} from "./adminConstants";
const initialState = {
  amount: null,
  users: [],
  location: { path: "users", name: "Users" },
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
      };
    case FETCH_USER_AMOUNT_SUCCESS:
      return {
        ...state,
        amount: action.payload,
      };
    case CHANGE_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
}
