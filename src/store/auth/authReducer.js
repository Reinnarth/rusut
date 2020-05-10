import { FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS } from "./authConstants";
const initialState = {
  token: null,
  role: ''
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        role: action.role,
      };

    case FETCH_REGISTER_SUCCESS:
      return {
        ...state,
        token: action.token,
      };

    default:
      return state;
  }
}
