import * as ACTIONS from '../constants';

import products from '../mocks/products.json';

const getProductsSuccess = (payload: any) => ({
    type: ACTIONS.GET_PRODUCTS_SUCCESS,
    payload,
});

const getProductsLoading = () => ({
    type: ACTIONS.GET_PRODUCTS_LOADING,
});

const getProductsError = (payload: any) => ({
    type: ACTIONS.GET_PRODUCTS_ERROR,
    payload,
});

const getAllProducts = (): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if (products) return resolve(products);
        return reject('An Error occured');
    }, 2000));

export const fetchAllProducts = () => async (dispatch: Function) => {
    try {
        dispatch(getProductsLoading());
        const response = await getAllProducts();
        dispatch(getProductsSuccess(response));
    } catch (errors) {
        dispatch(getProductsError(errors));
    }
};

const editProductSuccess = (payload: any) => ({
    type: ACTIONS.EDIT_PRODUCT_SUCCESS,
    payload,
});

const editProductLoading = () => ({
    type: ACTIONS.EDIT_PRODUCT_LOADING,
});

const editProductError = (payload: any) => ({
    type: ACTIONS.EDIT_PRODUCT_ERROR,
    payload,
});

export const clearSuccess = () => ({
    type: ACTIONS.CLEAR_SUCCESS,
});

const editProduct = (id: string, productBody: object): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(products) {
            const indexToUpdate = products.findIndex(product => product.id === id);
            const newObject = {...products[indexToUpdate], ...productBody};
            products[indexToUpdate] = newObject;
            return resolve(products)
        }
        return reject('An Error occured');
    }, 2000));

export const editProductData = (id: string, productBody: object) => async (dispatch: Function) => {
    try {
        dispatch(editProductLoading());
        const response = await editProduct(id, productBody);
        dispatch(editProductSuccess(response));
    } catch (errors) {
        dispatch(editProductError(errors));
    }
};

const deleteProductSuccess = (payload: any) => ({
    type: ACTIONS.DELETE_PRODUCT_SUCCESS,
    payload,
});

const deleteProductLoading = () => ({
    type: ACTIONS.DELETE_PRODUCT_LOADING,
});

const deleteProductError = (payload: any) => ({
    type: ACTIONS.DELETE_PRODUCT_ERROR,
    payload,
});


const deleteProduct = (id: string): Promise<any> => new Promise((resolve, reject) =>
    setTimeout(() => {
        if(products) {
            const indexToDelete = products.findIndex(product => product.id === id);
            products.splice(indexToDelete, 1);
            return resolve(products)
        }
        return reject('An Error occured');
    }, 2000));

export const deleteAProduct = (id: string) => async (dispatch: Function) => {
    try {
        dispatch(deleteProductLoading());
        const response = await deleteProduct(id);
        dispatch(deleteProductSuccess(response));
    } catch (errors) {
        dispatch(deleteProductError(errors));
    }
};
