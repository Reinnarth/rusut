import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOK_SUCCESS,
  UPLOAD_BOOK_SUCCESS,
} from "./libraryConstants";

const initialState = {
  books: [],
  book: {},
};

export default function libraryReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload,
      };
    case FETCH_BOOK_SUCCESS:
      return {
        ...state,
        book: action.payload,
      };

    case UPLOAD_BOOK_SUCCESS:
      return {
        ...state,
      };

    default:
      return state;
  }
}
