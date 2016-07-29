import * as types from '../constants/actionTypes';
import firebase from 'firebase';
import base from '../constants/base';
import oauth from 'panoptes-client/lib/oauth';

// References for our Firebase listener
let userListener;
let userRef;

export function checkLoginUser() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? dispatch(setLoginUser(user))
        : console.log('User not logged in')
    })
  }
}

function setLoginUser(user) {
  return dispatch => {
    console.info('Logged in as', user.uid)
    dispatch({
      type: types.USER_LOGIN,
      payload: user
    })
    userRef = firebase.database().ref(`users/${user.uid}`);
    userListener = userRef.on('value', dataSnapshot => {
      console.info('Updating userVotes object...')
      const voteData = dataSnapshot.child('votes').val();
      dispatch({
        type: types.USERVOTES_ADD,
        payload: voteData
      });
    });
  }
}

export function login() {
  return (dispatch) => {
    let token = "get-token-from-the-service-to-be-built";
    if (token) {
      console.log('token: ', token);
      return firebase.auth().signInWithCustomToken(token)
        .then(data => {
          // Check if we have an error object back
          if (data.code) {
            Promise.reject(data);
          } else {
            dispatch(setLoginUser(data))
          }
        })
        .catch(function(error) {
          console.log('error.code: ', error.code);
          console.log('error.message: ', error.message);
        });
    } else {
      dispatch(panoptesLogin())
      console.log('undefined token: ', token);
    }



  }
}
export function panoptesLogin() {
  return (dispatch) => {
    oauth.signIn(base.panoptesReturnUrl);
  }
}

export function logout() {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(user => {
        userRef.off('value', userListener);
        dispatch({ type: types.USER_LOGOUT });
        dispatch({ type: types.USERVOTES_REMOVE });
        console.log('Logout successful');
      });
  }
}
