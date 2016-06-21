import { browserHistory } from 'react-router';
import fetch from 'isomorphic-fetch';
import * as types from '../constants/actionTypes';
import firebase from 'firebase';


function pluckIssueProps(array) {
  let data = Object.keys(array).map(function(e) {
    return {
      id: array[e].number,
      title: array[e].title,
      body: array[e].body,
      url: array[e].html_url,
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
          data: pluckIssueProps(array),
          error: false,
          issue: null,
          loading: false,
        })
      })
      .catch(response => dispatch({
        type: types.RECEIVE_ISSUES_ERROR_GH,
        data: [],
        error: response,
        issue: null,
        loading: false,
      })
    );
  }
}
