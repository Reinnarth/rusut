import {
  FETCH_USERS_SUCCESS,
  FETCH_USER_AMOUNT_SUCCESS,
  CHANGE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  CHANGE_LOCATION_SUCCESS,
  CHANGE_TAB_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
  UPLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_SUCCESS,
} from "./adminConstants";

const initialState = {
  amount: null,
  oneContent: {},
  content: [],
  classifiers: [],
  tab: "users",
  location: { path: "/admin/users", name: "Пользователи" },
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_SUCCESS:
      return {
        ...state,
        content: action.payload.content,
        amount: action.payload.count,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        oneContent: action.payload,
      };
    case FETCH_USER_AMOUNT_SUCCESS:
      return {
        ...state,
        amount: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
      };
    case CHANGE_USER_SUCCESS:
      return { ...state, oneContent: action.payload };

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

    case UPLOAD_FILE_SUCCESS:
      return { ...state };

    case DOWNLOAD_FILE_SUCCESS:
      return { ...state };
    default:
      return state;
  }
}
