import * as types from '../constants/actionTypes';
import firebase from 'firebase';

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
    const userData = user.providerData[0];
    console.info('Logged in as', userData.uid, userData)
    dispatch({
      type: types.USER_LOGIN,
      payload: userData
    })

    userRef = firebase.database().ref(`users/${userData.uid}`);
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
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(data => {
        // Check if we have an error object back
        if (data.code) {
          Promise.reject(data);
        } else {
          dispatch(setLoginUser(data.user))
        }
      })
      .catch(error => {
        console.error('Error logging in: ', error);
      });
  }
}

export function logout() {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(user => {
        userRef.off('value', userListener);
        dispatch({ type: types.USER_LOGOUT });
        dispatch({ type: types.USERVOTES_CLEAR });
        console.log('Logout successful');
      });
  }
}
