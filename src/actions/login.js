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
      type: types.USER_LOGIN_PANOPTES,
      payload: user,
    });
  };
}


function getFirebaseToken(token) {
  return fetch('https://firebase-token-generator.zooniverse.org/validate', {
    method: 'POST',
    mode: 'cors',
    headers: new Headers({
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    }),
  })
  .then(response => response.json())
  .then(json => json.token)
  .catch(error => console.error('ERROR: ', error));
}

function setFirebaseUserDisplayname(fbUser) {
  return (dispatch) => {
    if (!fbUser.displayName) {
      oauth.checkCurrent()
        .then((user) => {
          fbUser.updateProfile({
            displayName: user.display_name,
          }).then(() => {
            console.log('Firebase displayName set.');
          }, (error) => {
            console.log('Error:', error);
          });
        })
        .catch((response) => {
          console.log('Failed to get user:', response);
        });
    }
  };
}

function firebaseLogin(apiToken) {
  return (dispatch) => {
    getFirebaseToken(apiToken)
      .then((firebaseToken) => {
        if (firebaseToken) {
          firebase.auth().signInWithCustomToken(firebaseToken)
            .then((userData) => {
              if (userData) {
                userRef = firebase.database().ref(`users/${userData.uid}`);
                userListener = userRef.on('value', (dataSnapshot) => {
                  console.info('Updating userVotes object...');
                  const voteData = dataSnapshot.child('votes').val();
                  dispatch({
                    type: types.USERVOTES_ADD,
                    payload: voteData,
                  });
                });
              }
              dispatch({
                type: types.USER_LOGIN_FIREBASE,
                payload: userData,
              });
              dispatch(setFirebaseUserDisplayname(userData));
              console.log('Firebase login successful.');
            })
            .catch((error) => {
              console.log('error: ', error);
            });
        } else {
          console.error('Undefined Firebase token');
        }
      });
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
    .then((user) => {
      if (user) {
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
