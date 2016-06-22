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
        data: action.data || [],
        error: action.error,
        loading: false,
      })
    case types.RECEIVE_ISSUES_ERROR_GH:
      return Object.assign({}, state, {
        data: [],
        error: action.error,
        loading: false,
      })
    case types.REQUEST_ISSUE_BY_ID:
      return Object.assign({}, state, {
        data: action.data || [],
        error: false,
        loading: true,
      })
    case types.REQUEST_ISSUE_BY_ID_SUCCESS:
      return Object.assign({}, state, {
        data: action.data || [],
        error: false,
        loading: true,
      })
    default:
      return state;
  }
}
