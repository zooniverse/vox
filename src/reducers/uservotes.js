import * as types from '../constants/actionTypes';

const initialState = {};

export function userVotes(state = initialState, action) {

  switch (action.type) {

    case types.USERVOTES_ADD:
      return Object.assign({}, state, action.payload);

    case types.USERVOTES_REMOVE:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
