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
  ADD_PLACE_PRACTICE,
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

export const updateContent = (path, data) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`${path}`, data)
    .then((response) => {
      dispatch(getContentArray(path, { offset: 0 }));
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
    .delete(`${path}/${id}`)
    .then((response) => {
      dispatch({
        type: DELETE_USER_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(getContentArray(path, { offset: 0 })))
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

export const uploadFile = (file, specialty, path) => (dispatch) => {
  dispatch(setLoading(true));

  API.axios
    .post(`/admin/library/${specialty}`, file, {
      headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
    })
    .then((response) => {
      dispatch({ type: UPLOAD_FILE_SUCCESS, payload: response.data });
    })
    .then(() => dispatch(getContentArray(path, { offset: 0 })))
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const addPlace = (path, data) => (dispatch) => {
  API.axios
    .post(`${path}`, data)
    .then((response) => {
      dispatch({
        type: ADD_PLACE_PRACTICE,
        payload: response,
      });
    })
    .then(() => dispatch(getContentArray(path, { offset: 0 })))
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

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        decodeURI(response.headers["content-disposition"].split("filename=")[1])
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
