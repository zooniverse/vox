import React from 'react';
import { Link } from 'react-router';
import packageJSON from '../../package.json';
import Auth from '../containers/Auth';

import firebase from 'firebase';
import base from '../constants/base';

firebase.initializeApp(base);

export default class App extends React.Component {
  render() {
    return (
      <div>
        <header className="site-header">
          <h1 className="title"><Link to="/">VoX - Vote Zooniverse next features</Link></h1>
          <Link to="/about" className="link">About</Link>
          <Auth base={base} />
        </header>
        <section className="content-section">
          {this.props.children || 'Welcome to VoX'}
        </section>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.object,
  base: React.PropTypes.object,
};
