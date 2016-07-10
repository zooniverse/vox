import * as types from '../constants/actionTypes';

export function user(state = {}, action) {
  switch (action.type) {

    case types.USER_LOGIN:
      return { ...action.payload };

    case types.USER_LOGOUT:
      return {};

    default:
      return state;
  }
}
