import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';


/* ******************** Action Creator **************************** */
/* *** If an Action Creator returns a function then system shoves in dispatch and getState parameters into it **** */
/*     we use dispatch to do a manual dispatch and getState() to get data from the Store *******                   */
/* **************************************************************** */
export const fetchPostsAndUsers = () => { 
  return async (dispatch, getState) => {
    await dispatch(fetchPosts());
    /* At this point the posts will be in the Store, thanks to the reducer
       We are doing an await so that we continue only AFTER all those posts are in the Store 
    */

    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    /*** No need to do await in the next line of code because we don't have to do any processing AFTER the user has been
         added to the Store
    *** */
    userIds.forEach(id => dispatch(fetchUser(id)));
}};


/* ******************** Action Creator **************************** */
/* **************************************************************** */
/* There is NO NEED to specify getState as the second parameter because we have no need for it here *** */
export const fetchPosts = () => async (dispatch) => {
  const response = await jsonPlaceholder.get('/posts');

  dispatch({ type: 'FETCH_POSTS', payload: response.data });
  /* There is a reducer that we have coded that will  add this payload to the Store **** */
};


/* ******************** Action Creator **************************** */
/* **************************************************************** */
/* This Action Creator expects an id to be sent as a parameter when we call this function */
export const fetchUser = (id) => async (dispatch) => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: 'FETCH_USER', payload: response.data });
};






// export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
// const _fetchUser = _.memoize(async (id, dispatch) => {
//   const response = await jsonPlaceholder.get(`/users/${id}`);

//   dispatch({ type: 'FETCH_USER', payload: response.data });
// });
