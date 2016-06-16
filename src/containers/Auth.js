import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { checkLoginUser, setLoginUser, loginToGithub, logoutFromGithub, upsertUser } from '../actions/login';

import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';

class Auth extends Component {

  constructor() {
    super();
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    if (!this.props.initialised) {
      this.props.dispatch(checkLoginUser(this.props.user));
    }
  }

  login() {
    return this.props.dispatch(loginToGithub());
  }

  logout() {
    return this.props.dispatch(logoutFromGithub());
  }

  render() {
    const { user } = this.props;
    return (user)
      ? <LogoutButton user={user.displayName} logout={this.logout} />
      : <LoginButton login={this.login} />;
  }
}

Auth.propTypes = {
  user: PropTypes.object,
  initialised: PropTypes.bool
};
Auth.defaultProps = {
  user: null,
  initialised: false
};
function mapStateToProps(state, ownProps) {
  return {
    user: state.login.user,
    initialised: state.login.initialised
  };
}
export default connect(mapStateToProps)(Auth);
