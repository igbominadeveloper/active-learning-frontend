import * as ACTIONS from '../constants';

import orders from '../mocks/orders.json';

import { Order } from '../../pages/Store';
import { generateId, getToday } from '../../utils/general';

const getOrdersSuccess = (payload: any) => ({
    type: ACTIONS.GET_ORDERS_SUCCESS,
    payload,
});

const getOrdersLoading = () => ({
    type: ACTIONS.GET_ORDERS_LOADING,
});

const getOrdersError = (payload: any) => ({
    type: ACTIONS.GET_ORDERS_ERROR,
    payload,
});

const getAllOrders = (): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if (orders) return resolve(orders);
        return reject('An Error occured');
    }, 2000));

export const fetchAllOrders = () => async (dispatch: Function) => {
    try {
        dispatch(getOrdersLoading());
        const response = await getAllOrders();
        dispatch(getOrdersSuccess(response));
    } catch (errors) {
        dispatch(getOrdersError(errors));
    }
};

const editOrderSuccess = (payload: any) => ({
    type: ACTIONS.EDIT_ORDER_SUCCESS,
    payload,
});

const editOrderLoading = () => ({
    type: ACTIONS.EDIT_ORDER_LOADING,
});

const editOrderError = (payload: any) => ({
    type: ACTIONS.EDIT_ORDER_ERROR,
    payload,
});

export const clearSuccess = () => ({
    type: ACTIONS.CLEAR_SUCCESS,
});

const editOrder = (id: string, orderBody: object): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(orders) {
            const indexToUpdate = orders.findIndex(order => order.id === id);
            const newObject = {...orders[indexToUpdate], ...orderBody};
            orders[indexToUpdate] = newObject;
            return resolve(orders)
        }
        return reject('An Error occured');
    }, 2000));

export const editOrderData = (id: string, orderBody: object) => async (dispatch: Function) => {
    try {
        dispatch(editOrderLoading());
        const response = await editOrder(id, orderBody);
        dispatch(editOrderSuccess(response));
    } catch (errors) {
        dispatch(editOrderError(errors));
    }
};

const deleteOrderSuccess = (payload: any) => ({
    type: ACTIONS.DELETE_ORDER_SUCCESS,
    payload,
});

const deleteOrderLoading = () => ({
    type: ACTIONS.DELETE_ORDER_LOADING,
});

const deleteOrderError = (payload: any) => ({
    type: ACTIONS.DELETE_ORDER_ERROR,
    payload,
});


const deleteOrder = (id: string): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(orders) {
            const indexToDelete = orders.findIndex(order => order.id === id);
            orders.splice(indexToDelete, 1);
            return resolve(orders)
        }
        return reject('An Error occured');
    }, 2000));

export const deleteAnOrder = (id: string) => async (dispatch: Function) => {
    try {
        dispatch(deleteOrderLoading());
        const response = await deleteOrder(id);
        dispatch(deleteOrderSuccess(response));
    } catch (errors) {
        dispatch(deleteOrderError(errors));
    }
};

const addNewOrderSuccess = (payload: any) => ({
    type: ACTIONS.ADD_NEW_ORDER_SUCCESS,
    payload,
});

const addNewOrderLoading = () => ({
    type: ACTIONS.ADD_NEW_ORDER_LOADING,
});

const addNewOrderError = (payload: any) => ({
    type: ACTIONS.ADD_NEW_ORDER_ERROR,
    payload,
});


const addNewOrder = (newOrder: Order): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(newOrder) {
            newOrder.datePlaced = getToday();
            return resolve([newOrder, ...orders]);
        }
        return reject('An Error occured');
    }, 2000));

export const addANewOrder = (newOrder: Order) => async (dispatch: Function) => {
    try {
        dispatch(addNewOrderLoading());
        const response = await addNewOrder({id: generateId(), ...newOrder});
        dispatch(addNewOrderSuccess(response));
    } catch (errors) {
        dispatch(addNewOrderError(errors));
    }
};
