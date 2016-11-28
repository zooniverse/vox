import React from 'react';
import Auth from '../containers/Auth';

import firebase from 'firebase';
import base from '../constants/base';

firebase.initializeApp(base);

class App extends React.Component {
  render() {
    console.log('Environment: ' + process.env.NODE_ENV);
    return (
      <div>

        <header className="db dt-ns w-100 border-box pa3 ph5-ns bb b--black-10 bg-near-white">
          <h1 className="db dtc-ns v-mid near-black w-100 w-25-ns tc tl-ns mb2 mb0-ns f3">
            VoX
          </h1>
          <nav className="db dtc-ns v-mid w-100 w-75-ns tc tr-ns">
            <Auth base={ base } />
          </nav>
        </header>

        <main className="pa3 ph5-ns mw7 center">
          <p className="f3 f2-ns tc lh-title mb5">Vote the features you want to see next on the Zooniverse.</p>
          {this.props.children || 'Welcome to VoX'}
        </main>

        <footer className="pa3 ph5-ns mw7 center tc">
          Zooniverse!
        </footer>

      </div>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.object,
  base: React.PropTypes.object,
};

export default App;
