import * as ACTIONS from '../constants';

import users from '../mocks/users.json';

import LocalStorage from '../../utils/localstorage';

interface userObject {
    email: string,
    password: string,
};

const authenticateUser = (userDetails: userObject): Promise<any> => new Promise((resolve, reject) => {
    setTimeout(() => {
        const user = users.find(user => user.email === userDetails.email && user.password === userDetails.password);
        if (user) {
            return resolve(user);
        }
        return reject('Invalid Credentials');
    }, 2000);
});

const authSuccess = (payload: any) => ({
    type: ACTIONS.AUTH_SUCCESS,
    payload,
});

const authLoading = () => ({
    type: ACTIONS.AUTH_LOADING,
});

const authError = (payload: any) => ({
    type: ACTIONS.AUTH_ERROR,
    payload,
});

export const authAction = (userObject: userObject, history: any) => async (dispatch: Function) => {
    try {
        dispatch(authLoading());
        const response = await authenticateUser(userObject);
        LocalStorage.addItem('user', JSON.stringify(response));
        dispatch(authSuccess(response));
        history.push('/');
    } catch (errors) {
        dispatch(authError(errors));
    }
};
