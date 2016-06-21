import * as types from '../constants/actionTypes';
import firebase from 'firebase';

import { objectFilter } from '../helpers';

// References for our Firebase listener
let userListener;
let userRef;

export function toggleVote(issueId) {
  return (dispatch, getState) => {
    const voted = getState().userVotes[issueId];
    const user = getState().user;
    userRef = firebase.database().ref(`users/${user.uid}`);
    let issueRef = firebase.database().ref(`issues/${issueId}`);
    console.log('VOTED? ', voted)
    if (!voted) {
      userRef.child(`/votes/${issueId}`).set(true);
      dispatch({ type: types.USERVOTES_ADD, payload: issueId });
      console.log('Vote added successfully')

      issueRef.once('value', dataSnapshot => {
        issueRef.child('vote_count').set(dataSnapshot.val().vote_count + 1)
      })
    } else {
      userRef.child(`/votes/${issueId}`).remove();
      dispatch({ type: types.USERVOTES_REMOVE });
      console.log('Vote removed successfully');

      issueRef.once('value', dataSnapshot => {
        issueRef.child('vote_count').set(dataSnapshot.val().vote_count - 1)
      })
    }
  }
}

