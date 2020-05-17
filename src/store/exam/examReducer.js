import {
  FETCH_EXAMS_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
  FETCH_EXAM_SUCCESS,
  ADD_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
  SET_SESSION_LOADING,
} from "./examConstants";

const initialState = {
  students: [],
  exams: [],
  exam: {},
  sessionLoading: true,
};

export default function examReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXAMS_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };
    case FETCH_EXAM_SUCCESS:
      return {
        ...state,
        exam: action.payload,
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case ADD_EXAM_SUCCESS:
      return {
        ...state,
        exam: action.payload,
      };

    case UPDATE_EXAM_SUCCESS:
      return {
        ...state,
      };

    case SET_SESSION_LOADING:
      return {
        ...state,
        sessionLoading: action.payload,
      };

    default:
      return state;
  }
}
