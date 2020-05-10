import API from "../../global/api";
import {
  ADD_STG_SUCCESS,
  DELETE_STG_SUCCESS,
  FETCH_CLASSIFIERS_SUCCESS,
} from "./stgConstants";

import { getCurrentUser } from "../user/userActions";
import { setLoading, setError } from "../view/viewActions";

export const addStg = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .post(`/teacher/stg/${id}`, data)
    .then((response) => {
      dispatch(getCurrentUser(localStorage.getItem("login")));
      dispatch({
        type: ADD_STG_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const deleteStg = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`/teacher/stg/${id}`, data)
    .then((response) => {
      dispatch(getCurrentUser(localStorage.getItem("login")));
      dispatch({
        type: DELETE_STG_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getClassifiers = () => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get("/teacher/classifiers")
    .then((response) => {
      dispatch({
        type: FETCH_CLASSIFIERS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};
