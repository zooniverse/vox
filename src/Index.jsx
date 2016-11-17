import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import Issues from './containers/Issues';
import base from './constants/base';

import oauth from 'panoptes-client/lib/oauth';

import configureStore from './store';
const store = configureStore();

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl';

window.React = React;

oauth.init(base.panoptesAppId)
  .then(() => {
    ReactDOM.render(
      <Provider store={store}>
        <Router>
          <Route path="/" component={App}>
            <IndexRoute component={Issues} />
          </Route>
        </Router>
      </Provider>
      , document.getElementById('root')
    );
  });
