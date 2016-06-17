import * as types from '../constants/actionTypes';
import firebase from 'firebase';


export function upVoteIssueById(payload) {
  return {
    type: USERVOTES_ADD,
    payload: payload
  };
}

export function downVoteIssueById(payload) {
  return {
    type: USERVOTES_CLEAR,
    payload: payload
  };
}
