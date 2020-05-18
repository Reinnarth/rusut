import API from "../../global/api";
import {
  FETCH_USER_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
  UPDATE_SELF_SUCCESS,
  UPDATE_PASSWORD_SUCCESS
} from "./userConstants";
import { setLoading, setError } from "../view/viewActions";

const roles = [
  ["ROLE_STUDENT", "student"],
  ["ROLE_TEACHER", "teacher"],
  ["ROLE_ADMIN", "admin"],
];

export const getCurrentUser = (login) => (dispatch) => {
  dispatch(setLoading(true));
  let role = undefined;
  API.axios
    .get(`/self/${login}`)
    .then((response) => {
      role = roles.find((el) => el[0] === response.data.nameRole);
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => {
      if (role) {
        return dispatch(getClassifiers(role[1]));
      }
    })

    .catch((error) => dispatch(setError(true)));
};

export const getClassifiers = (role) => (dispatch) => {
  API.axios
    .get(`/${role}/classifiers`)
    .then((response) => {
      dispatch({
        type: FETCH_CLASSIFIERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const updateSelf = (data) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put("/self", data)
    .then((response) => {
      dispatch({
        type: UPDATE_SELF_SUCCESS,
        payload: data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const updatePassword = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`/self/password/${id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS,
        payload: data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};
