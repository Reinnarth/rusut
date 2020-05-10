import { combineReducers } from "redux";

import authReducer from "../auth/authReducer";
import adminReducer from "../admin/adminReducer";
import userReducer from "../user/userReducer";
import viewReducer from "../view/viewReducer";
import stgReducer from "../stg/stgReducer";

export default combineReducers({
  authReducer,
  adminReducer,
  viewReducer,
  stgReducer,
  userReducer
});
