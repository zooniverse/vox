import * as types from '../constants/actionTypes';
import firebase from 'firebase';
import base from '../constants/base';
import oauth from 'panoptes-client/lib/oauth';

// References for our Firebase listener
let userListener;
let userRef;


function setLoginUser(user) {
  return dispatch => {
    dispatch({
      type: types.USER_LOGIN,
      payload: user,
    });
    if (user) {
      userRef = firebase.database().ref(`users/${user.uid}`);
      userListener = userRef.on('value', dataSnapshot => {
        console.info('Updating userVotes object...');
        const voteData = dataSnapshot.child('votes').val();
        dispatch({
          type: types.USERVOTES_ADD,
          payload: voteData,
        });
      });
    }
  };
}


function getFirebaseToken(token) {
//  don't hard code the endpoint
  return fetch('http://localhost:8080/validate', {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Authorization': token,
      'Content-Type': 'application/json',
    }),
  })
  .then(response => response.json())
  .then(json => json.token)
  .catch(error => console.error('ERROR: ', error));
}

function firebaseLogin(apiToken) {
  return (dispatch) => {
    getFirebaseToken(apiToken)
      .then(firebaseToken => {
        if (firebaseToken) {
          firebase.auth().signInWithCustomToken(firebaseToken)
            .then(userData => {
              dispatch(setLoginUser(userData));
              console.log('Firebase login successful.');
            })
            .catch(error => {
              console.log('error: ', error);
            });
        } else {
          console.error('Undefined Firebase token');
        }
      });
  };
}

function setFirebaseUserDisplayname(panoptesDisplayName) {
  return (dispatch, getState) => {
    const { user } = getState();
    if (user) {
      user.updateProfile({
        displayName: panoptesDisplayName,
      }).then(() => {
        console.log('Firebase displayName set.');
      }, (error) => {
        console.log('Error:', error);
      });
    }
  };
}

function panoptesLogin() {
  return oauth.signIn(base.panoptesReturnUrl);
}

export function login() {
  return (dispatch) => {
    if (oauth._tokenDetails) {
      dispatch(firebaseLogin(oauth._tokenDetails.access_token));
    } else {
      dispatch(panoptesLogin());
    }
  };
}

export function checkLoginUser() {
  return (dispatch) => {
    oauth.checkCurrent()
      .then(user => {
        if (user) {
          setFirebaseUserDisplayname(user.display_name);
          dispatch(setLoginUser(user));
          dispatch(login());
        }
      });
  };
}

function logoutFromPanoptes() {
  return (dispatch) => {
    oauth.signOut()
      .then(user => {
        dispatch(setLoginUser(user));
      });
  };
}

export function logout() {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(() => {
        userRef.off('value', userListener);
        dispatch({ type: types.USER_LOGOUT });
        dispatch({ type: types.USERVOTES_REMOVE });
        console.log('Firebase logout successful');
      })
      .then(() => {
        dispatch(logoutFromPanoptes());
      });
  };
}
