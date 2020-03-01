import * as ACTIONS from '../constants';

import users from '../mocks/users.json';

import LocalStorage from '../../utils/localstorage';
import { toast } from 'react-toastify';
import { generateId } from '../../utils/general';

interface registerObject {
    email: string;
    password: string;
    phone: string;
    id: string;
    fullName: string;
    username: string;
};

interface loginObject {
    email: string;
    password: string;
}

const authenticateUser = (userDetails: loginObject): Promise<any> => new Promise((resolve, reject) => {
    setTimeout(() => {
        const user = users.find(user => user.email === userDetails.email && user.password === userDetails.password);
        if (user) {
            return resolve(user);
        }
        return reject('Invalid Credentials');
    }, 2000);
});

const registerNewUser = (userDetails: registerObject): Promise<any> => new Promise((resolve, reject) => {
    setTimeout(() => {
        const existingUser = users.find(user => user.email === userDetails.email || user.phone === userDetails.phone);

        if (existingUser) return reject('Your email and phone number is in use, please choose another');
        const user: registerObject = { id: generateId(), ...userDetails };
        // writeFileSync(filename, JSON.stringify(users));
        return resolve(user);
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

export const loginAction = (userObject: loginObject, history: any) => async (dispatch: Function) => {
    try {
        dispatch(authLoading());
        const response = await authenticateUser(userObject);
        LocalStorage.addItem('user', JSON.stringify(response));
        dispatch(authSuccess(response));
        history.push('/');
        toast.success(`Welcome ${response.username}`)
    } catch (errors) {
        dispatch(authError(errors));
    }
};

export const registerAction = (userObject: registerObject, history: any) => async (dispatch: Function) => {
    try {
        dispatch(authLoading());
        const response = await registerNewUser(userObject);
        LocalStorage.addItem('user', JSON.stringify(response));
        dispatch(authSuccess(response));
        history.push('/');
        toast.success(`Welcome ${response.username}`)
    } catch (errors) {
        dispatch(authError(errors));
    }
};
