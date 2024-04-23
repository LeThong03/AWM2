const initialState = {
    selectedSubmissions: [],
    publicSubmissions: [],
  };
  
  const submissionsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'APPROVE_SUBMISSION':
        return {
          ...state,
          selectedSubmissions: state.selectedSubmissions.filter(submission => submission._id !== action.payload),
          publicSubmissions: [...state.publicSubmissions, action.submission],
        };
      case 'REMOVE_SUBMISSION':
        return {
          ...state,
          publicSubmissions: state.publicSubmissions.filter(submission => submission._id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default submissionsReducer;
  