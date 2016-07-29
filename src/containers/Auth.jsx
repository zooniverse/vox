import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as loginActions from '../actions/login';

import AuthButton from '../components/AuthButton';

class Auth extends Component {

  componentDidMount() {
    const { actions, user } = this.props;
    actions.checkLoginUser(user);
  }

  render() {
    const { actions, user } = this.props;
    const text = (user && (user.displayName)) ? `Logout ${user.displayName}` : 'Login';
    const action = (user && (user.displayName)) ? actions.logout : actions.login;
    return <AuthButton text={text} action={action} />;
  }
}

Auth.propTypes = {
  actions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

Auth.defaultProps = {
  user: {},
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(loginActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
