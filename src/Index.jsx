import React from 'react';
import ReactDOM from 'react-dom';
import { IndexRoute, Router, Route } from 'react-router';
import { Provider } from 'react-redux';
import App from './components/App';
import Issues from './containers/Issues';
import About from './components/About';

import { base } from './constants/base';

import configureStore from './store';
const store = configureStore();

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl';

window.React = React;

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App}>
        <IndexRoute component={Issues} />
        <Route path="/about" component={About}/>
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
