import * as ACTIONS from '../constants';

import users from '../mocks/users.json';

const getUsersSuccess = (payload: any) => ({
    type: ACTIONS.GET_USERS_SUCCESS,
    payload,
});

const getUsersLoading = () => ({
    type: ACTIONS.GET_USERS_LOADING,
});

const getUsersError = (payload: any) => ({
    type: ACTIONS.GET_USERS_ERROR,
    payload,
});

const getAllUsers = (): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if (users) return resolve(users);
        return reject('An Error occured');
    }, 2000));

export const fetchAllUsers = () => async (dispatch: Function) => {
    try {
        dispatch(getUsersLoading());
        const response = await getAllUsers();
        dispatch(getUsersSuccess(response));
    } catch (errors) {
        dispatch(getUsersError(errors));
    }
};
