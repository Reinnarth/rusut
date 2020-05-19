import API from "../../global/api";
import {
  FETCH_UPLOADS_SUCCESS,
  ADD_FILE_SUCCESS,
  SET_SESSION_LOADING,
} from "./internshipConstants";

import { setLoading, setError } from "../view/viewActions";

export const getMyUploads = (path, id) => (dispatch) => {
  dispatch(setSessionLoading(true));
  API.axios
    .get(`/student${path}/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_UPLOADS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setSessionLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getStudentUploads = (path, id) => (dispatch) => {
  dispatch(setSessionLoading(true));
  API.axios
    .get(`/teacher${path}/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_UPLOADS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setSessionLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const addFile = (path, file, id) => (dispatch) => {
  API.axios
    .post(`/student${path}/${id}`, file, {
      headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
    })
    .then((response) => {
      dispatch({
        type: ADD_FILE_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(getMyUploads(path, id)))

    .catch((error) => dispatch(setError(true)));
};

export const setMark = (path, data, id) => (dispatch) => {
  API.axios
    .put(`/teacher${path}/${id}`, "", { params: data })
    .then((response) => {
      dispatch({
        type: ADD_FILE_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => dispatch(setError(true)));
};

export const downloadFile = (path, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`${path}/file/${id}`, {
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

export const setSessionLoading = (sessionLoading) => (dispatch) => {
  dispatch({
    type: SET_SESSION_LOADING,
    payload: sessionLoading,
  });
};
