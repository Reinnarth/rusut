import {SET_ERROR, SET_LOADING} from "./viewConstants"

export const setLoading = (loading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: loading,
  });
};

export const isLoading = (state) => {
  return this.getRoot(state).loading;
};

export const setError = (error) => (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: error,
  });
};

export const isError = (state) => {
  return this.getRoot(state).error;
};
