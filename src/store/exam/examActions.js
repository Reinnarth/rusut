import API from "../../global/api";
import {
  FETCH_EXAMS_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
  ADD_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
} from "./stgConstants";

import { setLoading, setError } from "../view/viewActions";

export const getExams = (id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`/teacher/exams/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_EXAMS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const addExam = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .post(`/teacher/stg/${id}`, data)
    .then((response) => {
      dispatch({
        type: ADD_EXAM_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const updateExam = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`/teacher/stg/${id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_EXAM_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getStudents = (group) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .get(`/teacher/students/${group}`)
    .then((response) => {
      dispatch({
        type: UPDATE_EXAM_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
}