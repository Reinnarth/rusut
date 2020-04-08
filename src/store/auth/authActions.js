import API from "../../global/api";
import { FETCH_LOGIN_SUCCESS, FETCH_REGISTER_SUCCESS } from "./authConstants";

export const signIn = (data) => (dispatch) => {

  API.request.post( "/login", data)
    .then((response) => {
      localStorage.setItem("token", response.token);
      window.history.go("/");
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.data.token,
      });
    })
    .catch((e) => console.log(e));
};
export const signUp = (data) => (dispatch) => {
  API.request.post("/registration", data)
    .then((response) => {
      localStorage.setItem("token", response.token);
      window.history.go("/");
      dispatch({
        type: FETCH_LOGIN_SUCCESS,
        token: response.token,
      });
    })
    .catch((e) => console.log(e));
};
