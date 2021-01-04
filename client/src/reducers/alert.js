import * as Types from '../actions/types';

const initialState = [];

const alert = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case Types.SET_ALERT:
      return [...state, payload];
    case Types.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);
    default:
      return state;
  }
};

export default alert;
