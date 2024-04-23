// In reducers.js file
import {
    FETCH_SELECTED_SUBMISSIONS_REQUEST,
    FETCH_SELECTED_SUBMISSIONS_SUCCESS,
    FETCH_SELECTED_SUBMISSIONS_FAILURE,
    APPROVE_SUBMISSION_SUCCESS,
  } from './actions';
  
  const initialState = {
    submissions: [],
    loading: false,
    error: null,
  };
  
  const submissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SELECTED_SUBMISSIONS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_SELECTED_SUBMISSIONS_SUCCESS:
        return { ...state, loading: false, submissions: action.payload, error: null };
      case FETCH_SELECTED_SUBMISSIONS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      case APPROVE_SUBMISSION_SUCCESS:
        return {
          ...state,
          submissions: state.submissions.filter((submission) => submission._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default submissionReducer;
  