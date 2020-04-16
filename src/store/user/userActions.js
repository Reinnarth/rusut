import API from "../../global/api";
import { FETCH_USER_SUCCESS } from "./userConstants";

export const getCurrentUser = (data) => (dispatch) => {
  API.axios
    .get("/currentUser")
    .then((response) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        amount: response.data,
      });
    })
    .catch((e) => console.log(e));
};
export const getUsers = (params) => (dispatch) => {
  API.axios
    .get("//allUsers", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        users: response.data,
      });
    })
    .catch((e) => console.log(e));
};
