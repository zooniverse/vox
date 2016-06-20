import * as types from '../constants/actionTypes';

const initialState = {
  issue_id: '',
  voted: false
};

export function userVotes(state = initialState, action) {

  switch (action.type) {

    case types.USERVOTES_ADD:
      return Object.assign({}, state, action.payload);

    case types.USERVOTES_CLEAR:
      return Object.assign({}, initialState);

    default:
      return state;
  }
}
