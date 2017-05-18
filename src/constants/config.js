const firebase = {
  apiKey: 'AIzaSyAnFFj9tv7eSIqaG-vKYMDfRVQjiaSgfb4',
  authDomain: 'project-6243802502502885389.firebaseapp.com',
  databaseURL: 'https://project-6243802502502885389.firebaseio.com',
  storageBucket: 'project-6243802502502885389.appspot.com',
};

const DEFAULT_ENV = 'development';

const APP_HOSTS = {
  production: 'https://vote.zooniverse.org',
  development: 'http://local.zooniverse.org',
};

const SERVER_APP_HOSTS = {
  production: 'https://firebase-token-generator.zooniverse.org',
  development: 'localhost:8080',
};

const API_APPLICATION_IDS = {
  production: '907392fdbc092096534ea6b3658e04ff5a74ac6110326b1c24f86d91cf80fb5e',
  development: '7d29672921c090a277b4359e80ba8bb008a29b0fb556ab62145451514fe5f4c8',
};

const envFromBrowser = locationMatch(/\W?env=(\w+)/);
const envFromShell = process.env.NODE_ENV;

const env = envFromBrowser || envFromShell || DEFAULT_ENV;
if (!env.match(/^(production|development)$/)) {
  const errorMessage = `Panoptes Javascript Client Error: Invalid Environment;
    try setting NODE_ENV to "development" instead of ${envFromShell}.`;
  throw new Error(errorMessage);
}

module.exports = {
  appHost: APP_HOSTS[env],
  firebase,
  clientAppID: API_APPLICATION_IDS[env],
  serverAppHost: SERVER_APP_HOSTS[env],
};

// Try and match the location.search property against a regex.
function locationMatch(regex) {
  let match;
  if (typeof location !== 'undefined' && location !== null) {
    match = location.search.match(regex);
  }
  return (match && match[1]) ? match[1] : undefined;
}
