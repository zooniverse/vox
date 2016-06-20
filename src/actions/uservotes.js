import * as types from '../constants/actionTypes';
import firebase from 'firebase';

import { objectFilter } from '../helpers';

// References for our Firebase listener
let userListener;
let userRef;



//export function countVotesById(){
//  return ( dispatch, getState) => {
//    const user = getState().user;
//    userRef = firebase.database().ref(`users/${user.uid}`);
//    userListener = userRef.on('value', dataSnapshot => {
//      const voteData = dataSnapshot.child('votes').val();
//      const filtered = objectFilter(voteData, vote => vote === true)
//      console.log('filtered: ', filtered)
//      dataSnapshot.child('votes').forEach(obj => {
//        const val = obj.val();
//        console.log('VAL: ', val)
//      })
//    });
//  }
//}

export function voteIssueById(payload) {
  return ( dispatch, getState) => {
    const user = getState().user;
    userRef = firebase.database().ref(`users/${user.uid}`);
    userListener = userRef.on('value', dataSnapshot => {
      dataSnapshot.child('votes').forEach(obj => {
        if (obj.key == payload && obj.val() === false) {
          dispatch({
            type: types.USERVOTES_ADD,
            voted: true
          });
        }
      })
    });
  }
}

export function unVoteIssueById(payload) {
  return {
    type: types.USERVOTES_REMOVE,
    voted: false
  };
}
