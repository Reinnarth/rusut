import API from "../../global/api";
import {
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOK_SUCCESS,
  UPLOAD_BOOK_SUCCESS,
} from "./libraryConstants";

import { setLoading, setError } from "../view/viewActions";

export const getBooks = (params) => (dispatch) => {
  dispatch(setLoading(true));

  API.axios
    .get(`/library`, { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getBook = (id) => (dispatch) => {
  API.axios
    .get(`/library/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_BOOK_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => dispatch(setError(true)));
};

export const uploadBook = (file, specialty, path) => (dispatch) => {
  API.axios
    .post(`/teacher/library/${specialty}`, file, {
      headers: { "Content-Type": "multipart/form-data; charset=utf-8" },
    })
    .then((response) => {
      console.log(UPLOAD_BOOK_SUCCESS);
      dispatch({
        type: "pepega",
        payload: response.data,
      });
    })
    .then(() => dispatch(getBooks({ offset: 0 })))
    .catch((error) => dispatch(setError(true)));
};

export const downloadFile = (id) => (dispatch) => {
  API.axios
    .get(`/library/${id}`, {
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
    .catch((error) => dispatch(setError(true)));
};
