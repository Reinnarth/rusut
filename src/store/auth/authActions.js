import API from "../../global/api";
import { FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS } from "./authConstants";

export const signIn = (data) => (dispatch) => {
  API.axios
    .post("/login", data)
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("login", response.data.login);
        localStorage.setItem("role", response.data.nameRole);
        window.history.go("/semester");
        dispatch({
          type: FETCH_LOGIN_SUCCESS,
          token: response.data.token,
          role: response.data.nameRole,
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
      if (response.status === 200) {
        window.location.assign(`${window.location.origin}/signin`);
      }
      dispatch({
        type: FETCH_REGISTER_SUCCESS,
        token: response.data.token,
      });
    })
    .catch((e) => console.log(e));
};
