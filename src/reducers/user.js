import * as types from '../constants/actionTypes';

const initialState = {};

export function user(state = initialState, action) {
  switch (action.type) {

    case types.USER_LOGIN:
      return Object.assign({}, action.payload);

    case types.USER_LOGOUT:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
