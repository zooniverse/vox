import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import Issues from './containers/Issues';

import { base } from './constants/base';

import configureStore from './store';
const store = configureStore();

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl';

window.React = React;

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ Issues } />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
