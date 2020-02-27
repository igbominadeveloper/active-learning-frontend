import { GET_USERS_SUCCESS, GET_USERS_ERROR, GET_USERS_LOADING } from '../constants';

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
    case GET_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_USERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: null,
      };
    case GET_USERS_ERROR:
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
