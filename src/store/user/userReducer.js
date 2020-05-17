import {
  FETCH_USER_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
  UPDATE_SELF_SUCCESS,
} from "./userConstants";
const initialState = {
  user: {},
  classifiers: [],
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case FETCH_CLASSIFIERS_SUCCESS:
      return {
        ...state,
        classifiers: action.payload,
      };
    case UPDATE_SELF_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
}
