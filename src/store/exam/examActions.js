import API from "../../global/api";
import {
  FETCH_EXAMS_SUCCESS,
  FETCH_EXAM_SUCCESS,
  FETCH_STUDENTS_SUCCESS,
  ADD_EXAM_SUCCESS,
  UPDATE_EXAM_SUCCESS,
  SET_SESSION_LOADING,
} from "./examConstants";

import { setLoading, setError } from "../view/viewActions";

export const getExams = (id) => (dispatch) => {
  dispatch(setSessionLoading(true));
  API.axios
    .get(`/teacher/exams/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_EXAMS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setSessionLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getExam = (params, id, callback) => (dispatch) => {
  // dispatch(setLoading(true));

  API.axios
    .get(`/teacher/exam/${id}`, { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_EXAM_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => callback())
    // .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const addExam = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .post(`/teacher/exams/${id}`, data)
    .then((response) => {
      dispatch({
        type: ADD_EXAM_SUCCESS,
        payload: data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const updateExam = (data, id) => (dispatch) => {
  dispatch(setLoading(true));
  API.axios
    .put(`/teacher/exams/${id}`, data)
    .then((response) => {
      dispatch({
        type: UPDATE_EXAM_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const getStudents = (params, callback) => (dispatch) => {
  // dispatch(setLoading(true));

  API.axios
    .get("/teacher/students", { params: params })
    .then((response) => {
      dispatch({
        type: FETCH_STUDENTS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => callback())
    .then(() => dispatch(setLoading(false)));
  // .catch((error) => dispatch(setError(true)));
};

export const getMyExams = (semester, id) => (dispatch) => {
  dispatch(setSessionLoading(true));

  API.axios
    .get(`/student/exams/${id}`, { params: semester })
    .then((response) => {
      dispatch({
        type: FETCH_EXAMS_SUCCESS,
        payload: response.data,
      });
    })
    .then(() => dispatch(setSessionLoading(false)))
    .catch((error) => dispatch(setError(true)));
};

export const setSessionLoading = (sessionLoading) => (dispatch) => {
  dispatch({
    type: SET_SESSION_LOADING,
    payload: sessionLoading,
  });
};
