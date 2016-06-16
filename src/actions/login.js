import { browserHistory } from 'react-router';
import * as types from '../constants/actionTypes';
import firebase from 'firebase';

export function checkLoginUser() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged(user => {
      user
        ? dispatch(setLoginUser(user.providerData[0]))
        : console.log('User not logged in')
    })
  }
}

export function setLoginUser(user) {
  //console.log('set login user', user.uid)
  return (dispatch) => {
    dispatch({
      type: types.SET_LOGIN_USER,
      user
    });
  };
}

export function loginToGithub() {
  return (dispatch) => {
    const provider = new firebase.auth.GithubAuthProvider();
    return firebase.auth().signInWithPopup(provider)
      .then(data => {
        // Check if we have an error object back
        if (data.code) {
          Promise.reject(data);
        } else {
          console.log('Login successful. User: ', data.user.uid)
          return data;
        }
      })
      .catch(error => {
        console.error('Error logging in: ', error);
      });
  }
}

export function logoutFromGithub() {
  return (dispatch) => {
    firebase.auth().signOut()
      .then(user => {
        dispatch(setLoginUser(user));
        console.log('Logout successful');
      });
  }
}


export function upsertUser(data) {
  return dispatch => {
    dispatch({
      type: types.UPSERT_USER,
    });
    // this is not ideal because it will overwrite user data on login
    // At this stage I don't think we want to pass any values but
    // I don't seem to find the right firebase method to just create the data model.
    // On voting on an issue this path would be updated with an extra node made
    // with the issue-id and a boolean value of true (for "voted")
    return firebase.database().ref('users/' + data.user.uid + '/votes/').update({
      issue_id: false
    })
  }
}
