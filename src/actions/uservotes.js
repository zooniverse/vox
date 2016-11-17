import * as types from '../constants/actionTypes';
import firebase from 'firebase';

// References for our Firebase listener
let issueRef;
let userRef;

export function toggleVote(issueId) {
  return (dispatch, getState) => {
    const { user, userVotes } = getState();
    if (user.uid) {
      userRef = firebase.database().ref(`users/${ user.uid }`);
      issueRef = firebase.database().ref(`issues/${ issueId }`);
      if (!userVotes[issueId]) {
        userRef.child(`/votes/${ issueId }`).set(true);
        dispatch({
          type: types.USERVOTES_ADD,
          payload: issueId,
        });

        issueRef.once('value', dataSnapshot =>
          issueRef.child('vote_count').set(dataSnapshot.val().vote_count + 1));

        console.log('Vote added successfully');
      } else {
        userRef.child(`/votes/${ issueId }`).remove();
        dispatch({
          type: types.USERVOTES_REMOVE,
          payload: issueId,
        });

        issueRef.once('value', dataSnapshot =>
          issueRef.child('vote_count').set(dataSnapshot.val().vote_count - 1));
        console.log('Vote removed successfully');
      }
    }
  };
}
