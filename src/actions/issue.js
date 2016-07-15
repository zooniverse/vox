import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import firebase from 'firebase';


const _pluckIssueProps = issue => ({
  id: issue.number,
  title: issue.title,
  body: issue.body,
  url: issue.html_url,
  votes: 0,
});

export function fetchIssuesFromGH() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_ISSUES_GH,
    });
    return fetch('https://api.github.com/repos/zooniverse/wildcam-gorongosa-education/issues?labels=education-api')
      .then(response => response.json())
      .then(array => dispatch({
        type: types.RECEIVE_ISSUES_SUCCESS_GH,
        payload: array.map(_pluckIssueProps),
      }))
      .catch(response => dispatch({
        type: types.RECEIVE_ISSUES_ERROR_GH,
        payload: response,
      }));
  }
}

export function updateIssueVoteCount(id, votes) {
  return dispatch => dispatch({
    type: types.UPDATE_VOTE_COUNT,
    payload: {
      id,
      votes,
    }
  });
}
