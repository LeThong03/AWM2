// In actions.js file
export const FETCH_SELECTED_SUBMISSIONS_REQUEST = 'FETCH_SELECTED_SUBMISSIONS_REQUEST';
export const FETCH_SELECTED_SUBMISSIONS_SUCCESS = 'FETCH_SELECTED_SUBMISSIONS_SUCCESS';
export const FETCH_SELECTED_SUBMISSIONS_FAILURE = 'FETCH_SELECTED_SUBMISSIONS_FAILURE';

export const APPROVE_SUBMISSION_REQUEST = 'APPROVE_SUBMISSION_REQUEST';
export const APPROVE_SUBMISSION_SUCCESS = 'APPROVE_SUBMISSION_SUCCESS';
export const APPROVE_SUBMISSION_FAILURE = 'APPROVE_SUBMISSION_FAILURE';

export const fetchSelectedSubmissions = () => {
  return async (dispatch) => {
    dispatch({ type: FETCH_SELECTED_SUBMISSIONS_REQUEST });
    try {
      const response = await fetch('http://localhost:5000/selectedSubmissions');
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: FETCH_SELECTED_SUBMISSIONS_SUCCESS, payload: data });
      } else {
        throw new Error(`Failed to fetch selected submissions: ${response.statusText}`);
      }
    } catch (error) {
      dispatch({ type: FETCH_SELECTED_SUBMISSIONS_FAILURE, payload: error.message });
    }
  };
};

export const approveSubmission = (submissionId) => {
  return async (dispatch) => {
    dispatch({ type: APPROVE_SUBMISSION_REQUEST });
    try {
      const response = await fetch(`http://localhost:5000/approveSubmission/${submissionId}`, {
        method: 'PUT',
      });
      if (response.ok) {
        dispatch({ type: APPROVE_SUBMISSION_SUCCESS, payload: submissionId });
        console.log('Submission approved successfully');
      } else {
        throw new Error(`Failed to approve submission: ${response.statusText}`);
      }
    } catch (error) {
      dispatch({ type: APPROVE_SUBMISSION_FAILURE, payload: error.message });
    }
  };
};
