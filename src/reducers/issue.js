import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
  error: false,
  loading: false,
};

export function issues(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_ISSUES_GH:
      return {
        ...initialState,
        loading: true,
      };
    case types.RECEIVE_ISSUES_SUCCESS_GH:
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    case types.RECEIVE_ISSUES_ERROR_GH:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.UPDATE_VOTE_COUNT:
      return {
        ...state,
        data: state.data.map((issue) => {
          const updatedIssue = action.payload;
          return {
            ...issue,
            votes: (issue.id === updatedIssue.id) ? updatedIssue.votes : issue.votes,
          };
        }),
      };
    default:
      return state;
  }
}
