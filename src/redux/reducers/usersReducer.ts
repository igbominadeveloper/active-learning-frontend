import * as ACTIONS from '../constants';

export interface state {
  loading: boolean,
  error: any,
  data: any
};

interface ActionTypes {
  type: string,
  payload?: any
}

const usersDefaultState = {
  data: {},
  loading: false,
  error: null,
};


const usersReducer = (state: state = usersDefaultState, action: ActionTypes) => {
  switch (action.type) {
    case ACTIONS.GET_USERS_LOADING:
    case ACTIONS.EDIT_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ACTIONS.GET_USERS_SUCCESS:
    case ACTIONS.EDIT_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case ACTIONS.GET_USERS_ERROR:
    case ACTIONS.EDIT_USERS_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default usersReducer;
