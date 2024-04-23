import { combineReducers } from 'redux';
import submissionsReducer from './submissionsReducer';

const rootReducer = combineReducers({
  submissions: submissionsReducer,
});

export default rootReducer;
