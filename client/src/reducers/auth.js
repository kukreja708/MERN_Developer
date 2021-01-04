import * as Types from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload
      };
    case Types.REGISTER_SUCCESS:
    case Types.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true
      };
    case Types.REGISTER_FAIL:
    case Types.AUTH_ERROR:
    case Types.LOGIN_FAIL:
    case Types.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: false,
        loading: false,
        isAuthenticated: false,
        user: null
      };
    default:
      return state;
  }
};

export default auth;
