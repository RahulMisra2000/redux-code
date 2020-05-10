import streams from '../apis/streams';    /* ******  This is an AXIOS instance to do AJAX call against the json-server provided API *  */
import history from '../history';         /* ******  For doing Programmatic Navigation **** */
import {
  SIGN_IN,
  SIGN_OUT,
  CREATE_STREAM,
  FETCH_STREAMS,
  FETCH_STREAM,
  DELETE_STREAM,
  EDIT_STREAM
} from './types';

export const signIn = userId => {
  return {
    type: SIGN_IN,
    payload: userId
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT
  };
};

export const createStream = formValues => async (dispatch, getState) => {        /* ***** ASYNC Action Creator *** */
  const { userId } = getState().auth;
  const response = await streams.post('/streams', { ...formValues, userId });    /* So CRUD can be done against the external API */

  dispatch({ type: CREATE_STREAM, payload: response.data });                     /* So Reducers can do CUD on the STORE &/
  history.push('/');                                                             /* Programmatic navigation */
};

export const fetchStreams = () => async dispatch => {
  const response = await streams.get('/streams');

  dispatch({ type: FETCH_STREAMS, payload: response.data });
};

export const fetchStream = id => async dispatch => {
  const response = await streams.get(`/streams/${id}`);

  dispatch({ type: FETCH_STREAM, payload: response.data });
};

export const editStream = (id, formValues) => async dispatch => {
  const response = await streams.put(`/streams/${id}`, formValues);

  dispatch({ type: EDIT_STREAM, payload: response.data });
};

export const deleteStream = id => async dispatch => {
  await streams.delete(`/streams/${id}`);

  dispatch({ type: DELETE_STREAM, payload: id });
};
