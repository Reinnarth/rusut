import {
  FETCH_EXAMS_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
  ADD_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
} from "./stgConstants";

const initialState = {
  students: [],
  exams: [],
  exam: {}
};

export default function examReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_EXAMS_SUCCESS:
      return {
        ...state,
        exams: action.payload,
      };

    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        students: action.payload,
      };

    case ADD_EXAM_SUCCESS:
      return {
        ...state,
        oneContent: action.payload,
      };

    case UPDATE_EXAM_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
