import API from "../../global/api";
import { FETCH_USER_SUCCESS } from "./userConstants";

export const getCurrentUser = (login) => (dispatch) => {
  API.axios
    .get(`/self/${login}`)
    .then((response) => {
     
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      });
    })
    .catch((e) => console.log(e));
};
