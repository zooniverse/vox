import * as types from '../constants/actionTypes';

const initialState = {
  panoptes: {},
  firebase: {},
};

export function user(state = initialState, action) {
  switch (action.type) {
    case types.USER_LOGIN_PANOPTES:
      return Object.assign({}, state, { panoptes: action.payload });
    case types.USER_LOGIN_FIREBASE:
      return Object.assign({}, state, { firebase: action.payload });
    case types.USER_LOGOUT:
      return initialState;
    default:
      return state;
  }
}
