import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as loginActions from '../actions/login';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

class Auth extends Component {

  componentDidMount() {
    this.props.actions.checkLoginUser(this.props.user);
  }

  render() {
    const { user, actions } = this.props;
    return (user && user.displayName)
      ? <LogoutButton user={user.displayName} logout={actions.logout} />
      : <LoginButton login={actions.login} />;
  }
}

Auth.propTypes = {
  user: PropTypes.object,
};

Auth.defaultProps = {
  user: {},
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
