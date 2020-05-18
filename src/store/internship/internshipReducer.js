import {
  FETCH_UPLOADS_SUCCESS,
  ADD_FILE_SUCCESS,
  SET_SESSION_LOADING,
} from "./internshipConstants";

const initialState = {
  exams: [],
  uploads: [],
  sessionLoading: true,
};

export default function internshipReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_UPLOADS_SUCCESS:
      return {
        ...state,
        uploads: action.payload,
      };

    case ADD_FILE_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };
    case SET_SESSION_LOADING:
      return { ...state, sessionLoading: action.payload };

    default:
      return state;
  }
}
