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

const usersDefaultState: state = {
  data: {},
  loading: false,
  error: null,
  operationSuccess: false,
};


const usersReducer = (state: state = usersDefaultState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_USERS_LOADING:
    case ACTIONS.EDIT_USERS_LOADING:
    case ACTIONS.DELETE_USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_USERS_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
      };
      case ACTIONS.EDIT_USERS_SUCCESS:
      case ACTIONS.DELETE_USER_SUCCESS:
      return {
          ...state,
          data: action.payload,
          loading: false,
          error: null,
          operationSuccess: true,
      };
    case ACTIONS.GET_USERS_ERROR:
    case ACTIONS.EDIT_USERS_ERROR:
    case ACTIONS.DELETE_USER_ERROR:
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

export default usersReducer;
