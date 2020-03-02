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

const ordersDefaultState: state = {
  data: [],
  loading: false,
  error: null,
  operationSuccess: false,
};


const ordersReducer = (state: state = ordersDefaultState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_ORDERS_LOADING:
    case ACTIONS.EDIT_ORDER_LOADING:
    case ACTIONS.DELETE_ORDER_LOADING:
    case ACTIONS.ADD_NEW_ORDER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_ORDERS_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
      };
      case ACTIONS.EDIT_ORDER_SUCCESS:
      case ACTIONS.DELETE_ORDER_SUCCESS:
      case ACTIONS.ADD_NEW_ORDER_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
          operationSuccess: true,
      };
    case ACTIONS.GET_ORDERS_ERROR:
    case ACTIONS.EDIT_ORDER_ERROR:
    case ACTIONS.DELETE_ORDER_ERROR:
    case ACTIONS.ADD_NEW_ORDER_ERROR:
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

export default ordersReducer;
