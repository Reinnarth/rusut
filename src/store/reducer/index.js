import { combineReducers } from "redux";

import authReducer from "../auth/authReducer";
import adminReducer from "../admin/adminReducer";
import userReducer from "../user/userReducer";

export default combineReducers({
  authReducer,
  adminReducer,
});
