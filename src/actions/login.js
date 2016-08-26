import * as types from '../constants/actionTypes';
import firebase from 'firebase';
import base from '../constants/base';
import oauth from 'panoptes-client/lib/oauth';
import apiClient from 'panoptes-client/lib/api-client';

// References for our Firebase listener
let userListener;
let userRef;




export function login() {
  return (dispatch) => {
    oauth.checkCurrent()
      .then(user => {
        console.log('U S E R: ', user)
        const panoptesUser = user.login;
        if (panoptesUser) {
          firebase.auth().onAuthStateChanged(user => {
            if (user) {
              dispatch(setLoginUser(user))
            } else {
              console.log('User not logged in Firebase')
              firebaseLogin(panoptesUser)
            }
          })
        } else {
          console.log('User not logged in Panoptes')
          panoptesLogin()
        }
      });
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

function getFirebaseToken(apiToken) {
  return fetch('http://localhost:8000/validate?token=' + apiToken, {
    method: 'GET',
    mode: 'cors',
    headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then(response =>  response.json())
    .then(json => json.token)
    .catch(response => console.error('ERROR: ', response));
}

function firebaseLogin(username) {
    console.log('firebaseLogin()')
    getFirebaseToken(username)
      .then(token => {
        if (token) {
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
          console.error('undefined token: ', token);
        }
      })
}

function panoptesLogin() {
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
