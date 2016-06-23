import * as types from '../constants/actionTypes';

const initialState = {};

export function userVotes(state = initialState, action) {

  switch (action.type) {

    case types.USERVOTES_ADD:
      return Object.assign({}, state, action.payload);

    case types.USERVOTES_REMOVE:
      let newState = Object.assign({}, state);
      delete newState[action.payload]
      return newState

    default:
      return state;
  }
}
