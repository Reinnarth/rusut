import API from "../../global/api";
import {
  FETCH_USER_AMOUNT_SUCCESS,
  FETCH_USERS_SUCCESS,
  CHANGE_LOCATION_SUCCESS,
} from "./adminConstants";

export const getUserAmount = () => (dispatch) => {
  API.axios
    .get("/admin/counterUsers")
    .then((response) => {
      dispatch({
        type: FETCH_USER_AMOUNT_SUCCESS,
        payload: response.data.counter,
      });
    })
    .catch((e) => console.log(e));
};
export const getUsers = (params) => (dispatch) => {
  API.axios
    .get("/admin/allUsers", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    })
    .catch((e) => console.log(e));
};

export const setLocation = (location) => (dispatch) => {
  dispatch({
    type: CHANGE_LOCATION_SUCCESS,
    payload: location,
  });
};
