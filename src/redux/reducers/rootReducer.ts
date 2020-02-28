import { combineReducers } from 'redux';

import authReducer from './authenticationReducer';
import usersReducer from './usersReducer';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
});

export default rootReducer;
