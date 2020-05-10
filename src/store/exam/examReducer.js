import {
  FETCH_STG_SUCCESS,
  ADD_STG_SUCCESS,
  DELETE_STG_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
} from "./stgConstants";

const initialState = {
  stg: [],
  classifiers: [],
};

export default function examReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_CLASSIFIERS_SUCCESS:
      return {
        ...state,
        classifiers: action.payload,
      };

    case FETCH_STG_SUCCESS:
      return {
        ...state,
        stg: action.payload,
      };

    case ADD_STG_SUCCESS:
      return {
        ...state,
        oneContent: action.payload,
      };

    case DELETE_STG_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
