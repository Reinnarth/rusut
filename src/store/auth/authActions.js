import { post } from "../../global/api";
import { FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS } from "./authConstants";

export const signIn = (data) => (dispatch) => {
  return post(data, "/signin")
    .then((response) => {
      localStorage.setItem("token", response.token);
      window.history.go("/");
      dispatch({
        type: this.FETCH_LOGIN_SUCCESS,
        token: response.token,
      });
    })
    .catch((e) => console.log(e));
};
export const signUp = (data) => (dispatch) => {
  return post(data, "/signup")
    .then((response) => {
      localStorage.setItem("token", response.token);
      window.history.go("/");
      dispatch({
        type: this.FETCH_LOGIN_SUCCESS,
        token: response.token,
      });
    })
    .catch((e) => console.log(e));
};
