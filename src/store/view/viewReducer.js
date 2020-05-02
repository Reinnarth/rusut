import { SET_ERROR, SET_LOADING } from "./viewConstants";

const initialState = {
  error: false,
  loading: true,
};

export default function adminReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload, error: false };

    case SET_ERROR:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}
