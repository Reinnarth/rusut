import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_AMOUNT_SUCCESS,
  CHANGE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  CHANGE_LOCATION_SUCCESS,
  CHANGE_TAB_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
} from "./adminConstants";

const initialState = {
  amount: null,
  user: {},
  content: [],
  classifiers: [],
  tab: "users",
  location: { path: "/admin/users", name: "Users" },
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        content: action.payload,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_USER_AMOUNT_SUCCESS:
      return {
        ...state,
        amount: action.payload,
      };
    case CHANGE_USER_SUCCESS:
      return { ...state, user: action.payload };
    case CHANGE_LOCATION_SUCCESS:
      return {
        ...state,
        location: action.payload,
      };
    case CHANGE_TAB_SUCCESS:
      return {
        ...state,
        tab: action.payload,
      };
    case FETCH_CLASSIFIERS_SUCCESS:
      return { ...state, classifiers: action.payload };

    default:
      return state;
  }
}
