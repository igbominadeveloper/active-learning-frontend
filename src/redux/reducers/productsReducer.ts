import * as ACTIONS from '../constants';

export interface state {
  loading: boolean;
  error: any;
  data: any;
  operationSuccess: boolean
};

interface ActionTypes {
  type: string,
  payload?: any
}

const productsDefaultState: state = {
  data: {},
  loading: false,
  error: null,
  operationSuccess: false,
};


const productsReducer = (state: state = productsDefaultState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_PRODUCTS_LOADING:
    case ACTIONS.EDIT_PRODUCT_LOADING:
    case ACTIONS.DELETE_PRODUCT_LOADING:
    case ACTIONS.ADD_NEW_PRODUCT_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_PRODUCTS_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
      };
      case ACTIONS.EDIT_PRODUCT_SUCCESS:
      case ACTIONS.DELETE_PRODUCT_SUCCESS:
      case ACTIONS.ADD_NEW_PRODUCT_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
          operationSuccess: true,
      };
    case ACTIONS.GET_PRODUCTS_ERROR:
    case ACTIONS.EDIT_PRODUCT_ERROR:
    case ACTIONS.DELETE_PRODUCT_ERROR:
    case ACTIONS.ADD_NEW_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case ACTIONS.CLEAR_SUCCESS:
      return {
        ...state,
        operationSuccess: false,
      }
    default:
      return state;
  }
};

export default productsReducer;
