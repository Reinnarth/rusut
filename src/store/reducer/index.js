import { combineReducers } from "redux";

import authReducer from "../auth/authReducer";
import adminReducer from "../admin/adminReducer";
import userReducer from "../user/userReducer";
import viewReducer from "../view/viewReducer";
import stgReducer from "../stg/stgReducer";
import examReducer from "../exam/examReducer";
import libraryReducer from "../library/libraryReducer";
import internshipReducer from "../internship/internshipReducer";

export default combineReducers({
  authReducer,
  adminReducer,
  viewReducer,
  stgReducer,
  userReducer,
  examReducer,
  libraryReducer,
  internshipReducer,
});
