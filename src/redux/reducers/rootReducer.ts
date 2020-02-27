import { combineReducers } from 'redux';

import authReducer from './authenticationReducer';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
});

export default rootReducer;
