import { combineReducers } from 'redux';

import authReducer from './authenticationReducer';
import usersReducer from './usersReducer';
import productsReducer from './productsReducer';
import ordersReducer from './ordersReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    users: usersReducer,
    products: productsReducer,
    orders: ordersReducer,
});

export default rootReducer;
