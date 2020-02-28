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

const editUsersSuccess = (payload: any) => ({
    type: ACTIONS.EDIT_USERS_SUCCESS,
    payload,
});

const editUsersLoading = () => ({
    type: ACTIONS.EDIT_USERS_LOADING,
});

const editUsersError = (payload: any) => ({
    type: ACTIONS.EDIT_USERS_ERROR,
    payload,
});

export const clearSuccess = () => ({
    type: ACTIONS.CLEAR_SUCCESS,
});

const editUser = (id: string, userBody: object): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(users) {
            const indexToUpdate = users.findIndex(user => user.id === id);
            const newObject = {...users[indexToUpdate], ...userBody};
            users[indexToUpdate] = newObject;
            return resolve(users)
        }
        return reject('An Error occured');
    }, 2000));

export const editUserData = (id: string, userBody: object) => async (dispatch: Function) => {
    try {
        dispatch(editUsersLoading());
        const response = await editUser(id, userBody);
        dispatch(editUsersSuccess(response));
    } catch (errors) {
        dispatch(editUsersError(errors));
    }
};

const deleteUserSuccess = (payload: any) => ({
    type: ACTIONS.DELETE_USER_SUCCESS,
    payload,
});

const deleteUserLoading = () => ({
    type: ACTIONS.DELETE_USER_LOADING,
});

const deleteUserError = (payload: any) => ({
    type: ACTIONS.DELETE_USER_ERROR,
    payload,
});


const deleteUser = (id: string): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(users) {
            const indexToDelete = users.findIndex(user => user.id === id);
            users.splice(indexToDelete, 1);
            return resolve(users)
        }
        return reject('An Error occured');
    }, 2000));

export const deleteUserAccount = (id: string) => async (dispatch: Function) => {
    try {
        dispatch(deleteUserLoading());
        const response = await deleteUser(id);
        dispatch(deleteUserSuccess(response));
    } catch (errors) {
        dispatch(deleteUserError(errors));
    }
};
