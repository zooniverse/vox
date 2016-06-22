import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import firebase from 'firebase';


function _pluckIssueProps(array) {
  let data = Object.keys(array).map(e => {
    return {
      id: array[e].number,
      title: array[e].title,
      body: array[e].body,
      url: array[e].html_url,
      votes: 0,
      };
    }
  );
  return data;
}

export function fetchIssuesFromGH() {
  return dispatch => {
    dispatch({
      type: types.REQUEST_ISSUES_GH,
    });
    return fetch('https://api.github.com/repos/zooniverse/wildcam-gorongosa-education/issues?labels=education-api')
      .then(response => response.json())
      .then(array => {
        dispatch({
          type: types.RECEIVE_ISSUES_SUCCESS_GH,
          data: _pluckIssueProps(array),
          error: false,
          loading: false,
        })
      })
      .catch(response => dispatch({
        type: types.RECEIVE_ISSUES_ERROR_GH,
        data: [],
        error: response,
        loading: false,
      })
    );
  }
}


export function updateIssueVoteCount(id, votes) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_VOTE_COUNT,
      id: id,
      votes: votes,
    });
  }
}
