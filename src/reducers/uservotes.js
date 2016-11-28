import * as types from '../constants/actionTypes';

export function userVotes(state = {}, action) {
  switch (action.type) {
    case types.USERVOTES_ADD:
      return {
        ...state,
        ...action.payload,
      };
    case types.USERVOTES_REMOVE:
      const newState = { ...state };
      delete newState[action.payload];
      return newState;

    default:
      return state;
  }
}
