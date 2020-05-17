import {
  FETCH_EXAMS_SUCCESS,
  FETCH_UPLOADS_SUCCESS,
  ADD_FILE_SUCCESS,
} from "./internshipConstants";

const initialState = {
  exams: [],
  uploads: [],
};

export default function internshipReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXAMS_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };
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

    default:
      return state;
  }
}
