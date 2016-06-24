import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import firebase from 'firebase';


function _pluckIssueProps(array) {
  const data = Object.keys(array).map(el => {
    return {
      id: array[el].number,
      title: array[el].title,
      body: array[el].body,
      url: array[el].html_url,
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
          payload : _pluckIssueProps(array),
        })
      })
      .catch(response => dispatch({
        type: types.RECEIVE_ISSUES_ERROR_GH,
        payload: response,
      })
    );
  }
}


export function updateIssueVoteCount(id, votes) {
  return dispatch => {
    dispatch({
      type: types.UPDATE_VOTE_COUNT,
      payload: {
        id,
        votes,
      }
    });
  }
}
