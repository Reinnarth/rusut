import API from "../../global/api";
import {
  FETCH_USER_AMOUNT_SUCCESS,
  FETCH_USERS_SUCCESS,
  FETCH_USER_SUCCESS,
  CHANGE_USER_SUCCESS,
  DELETE_USER_SUCCESS,
  CHANGE_LOCATION_SUCCESS,
  CHANGE_TAB_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
} from "./adminConstants";

import { setLoading, setError } from "../view/viewActions";

export const getUserAmount = (params) => (dispatch) => {
  console.log(params)
  dispatch(setLoading(true));
  API.axios
    .get("/admin/counterUsers", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USER_AMOUNT_SUCCESS,
        payload: response.data.counter,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getUser = (id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`/admin/user/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getClassifiers = () => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get("/admin/classifiers")
    .then((response) => {
      dispatch({
        type: FETCH_CLASSIFIERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const updateUser = (data) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`/admin/users/updateUser`, data)
    .then((response) => {
      dispatch({
        type: CHANGE_USER_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const deleteUser = (id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .delete(`/admin/users/updateUser`)
    .then((response) => {
      dispatch({
        type: CHANGE_USER_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getContentArray = (path, params) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`${path}`, { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getTeachers = (params) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get("/admin/teachers", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getStudents = (params) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get("/admin/students", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_USERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const setLocation = (location) => (dispatch) => {
  dispatch({
    type: CHANGE_LOCATION_SUCCESS,
    payload: location,
  });
};

export const setTab = (tab) => (dispatch) => {
  dispatch({
    type: CHANGE_TAB_SUCCESS,
    payload: tab,
  });
};
