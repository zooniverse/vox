import * as types from '../constants/actionTypes';
import firebase from 'firebase';


export function voteIssueById(payload) {
  return {
    type: types.USERVOTES_ADD,
    payload: payload
  };
}

export function unVoteIssueById(payload) {
  return {
    type: types.USERVOTES_CLEAR,
    payload: payload
  };
}
