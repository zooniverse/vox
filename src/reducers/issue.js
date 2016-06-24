import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
  error: false,
  loading: false,
};

export function issues(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_ISSUES_GH:
      return Object.assign({}, state, {
        data: [],
        error: false,
        loading: true,
      })
    case types.RECEIVE_ISSUES_SUCCESS_GH:
      return Object.assign({}, state, {
        data: action.payload,
        error: false,
        loading: false,
      })
    case types.RECEIVE_ISSUES_ERROR_GH:
      return Object.assign({}, state, {
        data: [],
        error: action.payload,
        loading: false,
      })
    case types.UPDATE_VOTE_COUNT:
      const newState = Object.assign({}, state);
      newState.data = newState.data.map(issue => {
        const newIssue = Object.assign({}, issue)
        if (newIssue.id === action.payload.id) {
          newIssue.votes = action.payload.votes
        }
        return newIssue;
      });
      return newState;
    default:
      return state;
  }
}
