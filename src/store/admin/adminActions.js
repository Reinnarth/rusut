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
  UPLOAD_FILE_SUCCESS,
  DOWNLOAD_FILE_SUCCESS,
} from "./adminConstants";

import { setLoading, setError } from "../view/viewActions";

export const getUserAmount = (params) => (dispatch) => {
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

export const getOneContent = (id, path) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`${path}/${id}`)
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

export const deleteOneContent = (id, path) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .delete(`${path}/delete/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_USER_SUCCESS,
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

export const uploadFile = (file) => (dispatch) => {
  dispatch(setLoading(true));

  API.axios
    .post(`/admin/library`, file, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((response) => {
      dispatch({ type: UPLOAD_FILE_SUCCESS, payload: response.data });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const downloadFile = (id) => (dispatch) => {
  dispatch(setLoading(true));

  API.axios
    .get(`/admin/library/${id}`, {
      headers: { "Content-Type": "appplication/pdf" },
      responseType: "blob",
    })
    .then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      console.log(response);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        response.headers["content-disposition"].split("filename=")[1]
      );
      link.click();
      window.URL.revokeObjectURL(url);
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
