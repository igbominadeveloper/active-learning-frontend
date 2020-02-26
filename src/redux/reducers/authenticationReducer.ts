import { AUTH_SUCCESS, AUTH_ERROR, AUTH_LOADING } from '../constants';

export interface state {
  loading: boolean,
  error: any,
  data: any
};

interface ActionTypes {
  type: string,
  payload?: any
}

const authDefaultState = {
  data: {},
  loading: false,
  error: null,
};


const authReducer = (state: state = authDefaultState, action: ActionTypes) => {
  switch (action.type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        authenticatedUser: { ...action.payload },
        loading: false,
        error: null,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default authReducer;
