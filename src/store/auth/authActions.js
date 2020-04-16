import API from "../../global/api";
import { FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS } from "./authConstants";

export const signIn = (data) => (dispatch) => {
  API.axios
    .post("/login", data)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        window.history.go("/semester");
        dispatch({
          type: FETCH_LOGIN_SUCCESS,
          token: response.data.token,
          role: response.data.role,
        });
      } else {
      }
    })
    .catch((e) => console.log(e));
};
export const signUp = (data) => (dispatch) => {
  API.axios
    .post("/registration", data)
    .then((response) => {
      if (response.data.token) {
        console.log(response)
        console.log(window.history)
        localStorage.setItem("token", response.data.token);
        window.history.go("/semester");
        dispatch({
          type: FETCH_REGISTER_SUCCESS,
          token: response.data.token,
        });
      } else {
      }
    })
    .catch((e) => console.log(e));
};
